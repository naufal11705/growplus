<?php

namespace App\Http\Controllers;

use App\Http\Resources\LaporanResource;
use App\Models\Petugas;
use App\Repositories\Interfaces\OrangTuaRepositoryInterface;
use Illuminate\Http\Request;
use App\Repositories\Interfaces\ImunisasiRepositoryInterface;
use App\Repositories\Interfaces\PuskesmasRepositoryInterface;
use App\Events\ImunisasiNotification;
use App\Http\Requests\ImunisasiStoreRequest;
use App\Http\Requests\ImunisasiUpdateRequest;
use App\Models\AnakTantangan;
use App\Models\Imunisasi;
use Inertia\Inertia;
use Exception;

class PetugasController extends Controller
{
    protected $imunisasiRepository;
    protected $puskesmasRepository;
    protected $orangtuaRepository;

    public function __construct(ImunisasiRepositoryInterface $imunisasiRepository, PuskesmasRepositoryInterface $puskesmasRepository, OrangTuaRepositoryInterface $orangtuaRepository)
    {
        $this->imunisasiRepository = $imunisasiRepository;
        $this->puskesmasRepository = $puskesmasRepository;
        $this->orangtuaRepository = $orangtuaRepository;
    }
    public function imunisasi()
    {
        return Inertia::render('Petugas/Imunisasi', [
            'imunisasi' => $this->imunisasiRepository->getAllImunisasis()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function tambahImunisasi()
    {
        return Inertia::render('Petugas/Functions/Petugas/Tambah', [
            'puskesmas' => $this->puskesmasRepository->getAllPuskesmas()
        ]);
    }

    public function storeImunisasi(ImunisasiStoreRequest $request)
    {
        try {
            $validatedData = $request->validated();

            $imunisasi = $this->imunisasiRepository->createImunisasi($validatedData);

            event(new ImunisasiNotification($imunisasi));

            return redirect()->route('petugas.imunisasi')->with('success', 'Data berhasil ditambahkan.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Data gagal ditambahkan.');
        }
    }

    public function dashboard()
    {
        return redirect('/petugas/imunisasi');
    }

    public function profile()
    {
        $petugas = auth()->user();
        return Inertia::render('Petugas/Profile', [
            'petugas' => $petugas,
        ]);
    }

    public function editImunisasi($id)
    {
        $imunisasi = $this->imunisasiRepository->getImunisasiById($id);
        return Inertia::render('Petugas/Functions/Petugas/Edit', [
            'imunisasi' => $imunisasi,
            'puskesmas' => $this->puskesmasRepository->getAllPuskesmas()
        ]);
    }

    public function updateImunisasi(ImunisasiUpdateRequest $request, $id)
    {
        try {
            $validatedData = $request->validated();

            $this->imunisasiRepository->updateImunisasi($id, $validatedData);

            return redirect()->route('petugas.imunisasi')->with('success', 'Data berhasil diperbarui.');
            ;
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Data gagal diperbarui.');
        }
    }

    public function destroyImunisasi($id)
    {
        try {
            $this->imunisasiRepository->deleteImunisasi($id);
            return redirect()->route('petugas.imunisasi')->with('success', 'Data berhasil dihapus.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Data gagal dihapus.');
        }
    }

    public function laporan()
    {
        return Inertia::render('Petugas/Laporan', [
            'orangtuas' => $this->orangtuaRepository->getAllOrangtua(),
        ]);
    }

    public function detailLaporan($id)
    {
        $orangtua = $this->orangtuaRepository->getOrangtuaById($id)->load('anak');
        return Inertia::render('Petugas/Functions/Laporan/Detail', [
            'orangtua' => (new LaporanResource($orangtua))->toArray(request()),
        ]);
    }

    public function getLaporanByAnak($anak_id)
    {
        $laporan = AnakTantangan::where('anak_id', $anak_id)
            ->with(['tantangan.fase']) // Eager load relationships
            ->get()
            ->map(function ($anakTantangan) {
                return [
                    'tantangan' => $anakTantangan->tantangan->activity,
                    'fase' => $anakTantangan->tantangan->fase->judul ?? 'Tidak Diketahui',
                    'tanggal' => $anakTantangan->tanggal_selesai
                        ? \Carbon\Carbon::parse($anakTantangan->tanggal_selesai)->format('Y-m-d')
                        : '-',
                    'status' => $anakTantangan->sudah_klaim ? 'Selesai' : 'Belum Diklaim',
                ];
            })->toArray();

            dd($laporan);

        return Inertia::render('Petugas/DetailLaporan', [
            'laporan' => $laporan,
        ]);
    }
}
