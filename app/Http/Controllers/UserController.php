<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Tantangan;
use Illuminate\Http\Request;
use App\Models\PenggunaTantangan;
use App\Http\Resources\FaseResource;
use App\Repositories\Interfaces\AnakRepositoryInterface;
use App\Repositories\Interfaces\FaseRepositoryInterface;
use App\Repositories\Interfaces\OrangTuaRepositoryInterface;
use App\Repositories\Interfaces\PenggunaTantanganRepositoryInterface;

class UserController extends Controller
{

    protected $orangTuaRepository, $anakRepository, $faseRepository, $penggunaTantanganRepository;

    public function __construct(
        OrangTuaRepositoryInterface $orangTuaRepository,
        AnakRepositoryInterface $anakRepository,
        FaseRepositoryInterface $faseRepository,
        PenggunaTantanganRepositoryInterface $penggunaTantanganRepository
    ) {
        $this->orangTuaRepository = $orangTuaRepository;
        $this->anakRepository = $anakRepository;
        $this->faseRepository = $faseRepository;
        $this->penggunaTantanganRepository = $penggunaTantanganRepository;
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
        $totalPoints = $this->penggunaTantanganRepository->countTotalPoints($pengguna_id);
        $streak = $this->penggunaTantanganRepository->getPenggunaTantangansByPenggunaId($pengguna_id)->count();

        return Inertia::render('User/Dashboard', [
            'totalPoints' => $totalPoints,
            'totalProgress' => $totalProgress,
            'streak' => $streak,
            'fases' => $nonActiveFaseData,
        ]);
    }

    public function profil()
    {
        $orangtua = auth()->user()->orangtua;
        $pengguna = auth()->user();
        $anak = auth()->user()->orangtua->anak;
        return Inertia::render('User/Profile', [
            'orangtua' => $orangtua,
            'pengguna' => $pengguna,
            'anak' => $anak
        ]);
    }

    public function tantangan()
    {
        $fases = $this->faseRepository->getAllFase()->load('tantangans');

        return Inertia::render('User/Tantangan', [
            'fases' => FaseResource::collection($fases)->toArray(request())
        ]);
    }

    public function showTantangan($id)
    {
        $fase = $this->faseRepository->getFaseById($id)->load('tantangans');
        $tantangansDone = $this->penggunaTantanganRepository->getPenggunaTantangansByPenggunaId(auth()->user()->pengguna_id);

        return Inertia::render('User/DetailTantangan', [
            'fase' => (new FaseResource($fase))->toArray(request()),
            'tantangansDone' => $tantangansDone
        ]);
    }

    public function artikel()
    {
        return Inertia::render('User/Artikel');
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
            'orangtua.pekerjaan' => 'required|string|max:255',
            'orangtua.penghasilan' => 'required|numeric',
            'orangtua.sumber_penghasilan' => 'required|string|max:255',
            'orangtua.jumlah_tanggungan' => 'required|integer',
            'orangtua.status_rumah' => 'required|string|max:255',
            'orangtua.tanggungan_listrik' => 'required|integer',
            'orangtua.tanggungan_air' => 'required|integer',

            'anak' => 'required|array',
            'anak.*.nama' => 'required|string|max:255',
            'anak.*.nik' => 'required|string|min:16|max:16',
            'anak.*.no_jkn' => 'required|string|min:13|max:13',
            'anak.*.tempat_lahir' => 'required|string|max:255',
            'anak.*.tanggal_lahir' => 'required|date',
            'anak.*.golongan_darah' => 'required|string|max:3',
            'anak.*.berat_badan' => 'required|integer',
            'anak.*.tinggi_badan' => 'required|integer',
        ]);

        // After validation, access and save the data
        $orangtuaData = $validatedData['orangtua'];
        $orangtuaData['pengguna_id'] = auth()->user()->pengguna_id;
        $orangtua = $this->orangTuaRepository->createOrangTua($orangtuaData);

        foreach ($validatedData['anak'] as $anak) {
            $anak['orangtua_id'] = $orangtua->orangtua_id;
            $this->anakRepository->createAnak($anak);
        }

        return redirect()->route('user.dashboard');
    }

    // public static function calculateProgress($fase)
    // {
    //     if (!auth()->check()) {
    //         return 0;
    //     }

    //     $penggunaId = auth()->user()->pengguna_id;
    //     $totalTantangans = $fase->tantangans->count();
    //     if ($totalTantangans == 0) {
    //         return 0;
    //     }

    //     $completedTantangans = PenggunaTantangan::where('pengguna_id', $penggunaId)
    //         ->whereIn('tantangan_id', $fase->tantangans->pluck('id'))
    //         ->count();

    //     return (int)(($completedTantangans / $totalTantangans) * 100);
    // }
}
