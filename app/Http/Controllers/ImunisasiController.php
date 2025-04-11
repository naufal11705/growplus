<?php

namespace App\Http\Controllers;

use App\Events\ImunisasiNotification;
use App\Http\Requests\ImunisasiStoreRequest;
use App\Http\Requests\ImunisasiUpdateRequest;
use App\Models\Imunisasi;
use App\Repositories\Interfaces\ImunisasiRepositoryInterface;
use App\Repositories\Interfaces\PuskesmasRepositoryInterface;;

use Inertia\Inertia;
use Exception;

class ImunisasiController extends Controller
{
    protected $imunisasiRepository;
    protected $puskesmasRepository;

    public function __construct(ImunisasiRepositoryInterface $imunisasiRepository, PuskesmasRepositoryInterface $puskesmasRepository)
    {
        $this->imunisasiRepository = $imunisasiRepository;
        $this->puskesmasRepository = $puskesmasRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Imunisasi', [
            'imunisasi' => $this->imunisasiRepository->getAllImunisasis()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Functions/Imunisasi/Tambah', [
            'puskesmas' => $this->puskesmasRepository->getAllPuskesmas()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ImunisasiStoreRequest $request)
    {
        try {
            $validatedData = $request->validated();

            $imunisasi = $this->imunisasiRepository->createImunisasi($validatedData);
    
            event(new ImunisasiNotification($imunisasi));
    
            return redirect()->route('imunisasi.index')->with('success', 'Data berhasil ditambahkan.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Data gagal ditambahkan.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $this->imunisasiRepository->getImunisasiById($id);
        return Inertia::render('Admin/Imunisasi/Show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return Inertia::render('Admin/Functions/Imunisasi/Edit', [
            'puskesmas' => $this->puskesmasRepository->getAllPuskesmas(),
            'imunisasi' => $this->imunisasiRepository->getImunisasiById($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ImunisasiUpdateRequest $request, $id)
    {
        try {
            $validatedData = $request->validated();

            $this->imunisasiRepository->updateImunisasi($id, $validatedData);
    
            return redirect()->route('imunisasi.index')->with('success', 'Data berhasil diperbarui.');;
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Data gagal diperbarui.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->imunisasiRepository->deleteImunisasi($id);
    }

    public function getImunisasiByKecamatan($kecamatan)
    {
        $imunisasi = Imunisasi::whereHas('puskesmas', function ($query) use ($kecamatan) {
            $query->where('kecamatan', $kecamatan);
        })
            ->with('puskesmas')
            ->orderBy('tanggal', 'desc')
            ->get()
            ->map(function ($item) {
                return [
                    'imunisasi_id' => $item->imunisasi_id,
                    'nama' => $item->nama,
                    'jenis' => $item->jenis,
                    'tanggal' => $item->tanggal,
                    'puskesmas' => $item->puskesmas->nama,
                    'kecamatan' => $item->puskesmas->kecamatan,
                    'alamat' => $item->puskesmas->alamat
                ];
            });
        // dd($imunisasi);

        return response()->json($imunisasi);
    }

    public function sendNotification($kecamatan)
    {
        $imunisasi = Imunisasi::whereHas('puskesmas', function ($query) use ($kecamatan) {
            $query->where('kecamatan', $kecamatan);
        })->with('puskesmas')->get();

        return response()->json($imunisasi);
    }
}
