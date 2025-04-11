<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Tantangan;
use Illuminate\Http\Request;
use App\Models\AnakTantangan;
use App\Http\Resources\FaseResource;
use App\Repositories\Interfaces\AnakRepositoryInterface;
use App\Repositories\Interfaces\FaseRepositoryInterface;
use App\Repositories\Interfaces\OrangTuaRepositoryInterface;
use App\Repositories\Interfaces\AnakTantanganRepositoryInterface;

class UserController extends Controller
{

    protected $orangTuaRepository, $anakRepository, $faseRepository, $anakTantanganRepository;

    public function __construct(
        OrangTuaRepositoryInterface $orangTuaRepository,
        AnakRepositoryInterface $anakRepository,
        FaseRepositoryInterface $faseRepository,
        AnakTantanganRepositoryInterface $anakTantanganRepository
    ) {
        $this->orangTuaRepository = $orangTuaRepository;
        $this->anakRepository = $anakRepository;
        $this->faseRepository = $faseRepository;
        $this->anakTantanganRepository = $anakTantanganRepository;
    }

    public function dashboard()
    {
        $pengguna_id = auth()->user()->pengguna_id;
        $fases = $this->faseRepository->getAllFase()->load('tantangans');

        $activeFase = $fases->firstWhere('status', 1);
        $nonActiveFases = $fases->where('status', 0);
        $nonActiveFaseData = FaseResource::collection($nonActiveFases)->resolve();

        $totalProgress = 0;
        if ($activeFase) {
            $faseResource = new FaseResource($activeFase);
            $totalProgress = $faseResource->calculateProgress();
        }
        $totalPoints = $this->anakTantanganRepository->countTotalPoints($pengguna_id);
        $streak = $this->anakTantanganRepository->getAnakTantangansByAnakId($pengguna_id)->count();

        $kecamatan = auth()->user()->orangtua->kecamatan;
        // dd($kecamatan);
        // exit;

        return Inertia::render('User/Dashboard', [
            'totalPoints' => $totalPoints,
            'totalProgress' => $totalProgress,
            'streak' => $streak,
            'fases' => $nonActiveFaseData,
            'kecamatan' => $kecamatan,
        ]);
    }

    public function profil()
    {
        $orangtua = auth()->user()->orangtua;
        $pengguna = auth()->user();
        $anak = auth()->user()->orangtua->anak->get();
        return Inertia::render('User/Profile', [
            'orangtua' => $orangtua,
            'pengguna' => $pengguna,
            'anak' => $anak
        ]);
    }

    public function tantangan()
    {
        $fases = $this->faseRepository->getAllFase()->load('tantangans');
        $tingkat_ekonomi = auth()->user()->orangtua->tingkat_ekonomi;

        $filteredFases = $fases->map(function ($fase) use ($tingkat_ekonomi) {
            $filteredTantangans = $fase->tantangans->where('tingkat_ekonomi', $tingkat_ekonomi)->values();
            $fase->setRelation(
                'tantangans',
                $filteredTantangans
            );
            return $fase;
        });

        return Inertia::render('User/Tantangan', [
            'fases' => FaseResource::collection($filteredFases)->toArray(request()),
            'tingkatEkonomi' => $tingkat_ekonomi,
        ]);
    }

    public function showTantangan($id)
    {
        $fase = $this->faseRepository->getFaseById($id)->load('tantangans');

        if ($fase) {
            $filteredTantangans = $fase->tantangans->where('tingkat_ekonomi', auth()->user()->orangtua->tingkat_ekonomi)->values();
            $fase->setRelation('tantangans', $filteredTantangans);
        }

        $tantangansDone = $this->anakTantanganRepository->getAnakTantangansByAnakId(auth()->user()->pengguna_id);
        return Inertia::render('User/DetailTantangan', [
            'fase' => $fase ? (new FaseResource($fase))->toArray(request()) : null,
            'tantangansDone' => $tantangansDone
        ]);
    }

    public function artikel()
    {
        return Inertia::render('User/Artikel');
    }

    public function voucher()
    {
        $pengguna_id = auth()->user()->pengguna_id;
        $totalPoints = $this->anakTantanganRepository->countTotalPoints($pengguna_id);

        return Inertia::render('User/Voucher', [
            'totalPoints' => $totalPoints
        ]);
    }

    public function registerStepForm()
    {
        return Inertia::render('Auth/RegisterStep');
    }

    public function registerStep(Request $request)
    {
        $validatedData = $request->validate([
            'orangtua.nama' => 'required|string|max:255',
            'orangtua.nik' => 'required|string|min:16|max:16',
            'orangtua.no_jkn' => 'required|string|min:13|max:13',
            'orangtua.tempat_lahir' => 'required|string|max:255',
            'orangtua.tanggal_lahir' => 'required|date',
            'orangtua.golongan_darah' => 'required|string|max:3',
            'orangtua.alamat' => 'required|string',
            'orangtua.kecamatan' => 'required|string',
            'orangtua.kabupaten' => 'required|string',
            'orangtua.provinsi' => 'required|string',
            'orangtua.pekerjaan' => 'required|string|max:255',
            'orangtua.penghasilan' => 'required|string',
            'orangtua.sumber_penghasilan' => 'required|string|max:255',
            'orangtua.jumlah_tanggungan' => 'required|integer',
            'orangtua.status_rumah' => 'required|string|max:255',
            'orangtua.tanggungan_listrik' => 'required|integer',
            'orangtua.tanggungan_air' => 'required|integer',

            'anak' => 'nullable|array',
            'anak.*.nama' => 'required_with:anak|string|max:255',
            'anak.*.nik' => 'required_with:anak|string|min:16|max:16',
            'anak.*.no_jkn' => 'required_with:anak|string|min:13|max:13',
            'anak.*.tempat_lahir' => 'required_with:anak|string|max:255',
            'anak.*.tanggal_lahir' => 'required_with:anak|date',
            'anak.*.golongan_darah' => 'required_with:anak|string|max:3',
            'anak.*.berat_badan' => 'required_with:anak|integer',
            'anak.*.tinggi_badan' => 'required_with:anak|integer',
        ]);

        $penghasilan = $validatedData['orangtua']['penghasilan'];
        $tanggungan = $validatedData['orangtua']['jumlah_tanggungan'];
        $status_rumah = $validatedData['orangtua']['status_rumah'];
        $tagihan_listrik = $validatedData['orangtua']['tanggungan_listrik'];
        $tagihan_air = $validatedData['orangtua']['tanggungan_air'];

        $normalisasiPenghasilan = match ($penghasilan) {
            '500.000 - 1.000.000' => 20,
            '1.000.001 - 2.000.000' => 40,
            '2.000.001 - 3.000.000' => 60,
            '3.000.001 - 4.000.000' => 80,
            '4.000.001 - <5.000.000' => 100,
            default => 0,
        };

        $normalisasiTanggungan = 100 - (($tanggungan / 5) * 100);
        $normalisasiTanggungan = max(0, min(100, $normalisasiTanggungan)); // Pastikan nilai antara 0 dan 100

        $normalisasiStatusRumah = match ($status_rumah) {
            'Milik Sendiri' => 100,
            'Milik Sendiri (Cicilan)' => 75,
            'Kontrak' => 50,
            default => 0,
        };

        $normalisasiTagihanListrik = min(100, ($tagihan_listrik / 2000000) * 100);

        $normalisasiTagihanAir = min(100, ($tagihan_air / 2000000) * 100);

        $bobotPenghasilan = 0.50;
        $bobotTanggungan = 0.20;
        $bobotStatusRumah = 0.20;
        $bobotTagihanListrik = 0.05;
        $bobotTagihanAir = 0.05;

        $skorTotal = ($normalisasiPenghasilan * $bobotPenghasilan) +
            ($normalisasiTanggungan * $bobotTanggungan) +
            ($normalisasiStatusRumah * $bobotStatusRumah) +
            ($normalisasiTagihanListrik * $bobotTagihanListrik) +
            ($normalisasiTagihanAir * $bobotTagihanAir);

        $tingkatEkonomi = '';
        if ($skorTotal >= 0 && $skorTotal <= 33) {
            $tingkatEkonomi = 3;
        } elseif ($skorTotal >= 34 && $skorTotal <= 66) {
            $tingkatEkonomi = 2;
        } elseif ($skorTotal >= 67 && $skorTotal <= 100) {
            $tingkatEkonomi = 1;
        }

        $orangtuaData = $validatedData['orangtua'];
        $orangtuaData['pengguna_id'] = auth()->user()->pengguna_id;
        $orangtuaData['tingkat_ekonomi'] = $tingkatEkonomi; // Inputkan status ekonomi
        $orangtua = $this->orangTuaRepository->createOrangTua($orangtuaData);

        if (isset($validatedData['anak']) && is_array($validatedData['anak'])) {
            foreach ($validatedData['anak'] as $anak) {
                $anak['orangtua_id'] = $orangtua->orangtua_id;
                $this->anakRepository->createAnak($anak);
            }
        }

        return redirect()->route('user.dashboard');
    }
}
