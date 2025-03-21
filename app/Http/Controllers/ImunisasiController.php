<?php

namespace App\Http\Controllers;

use App\Events\ImunisasiNotification;
use App\Http\Requests\ImunisasiStoreRequest;
use App\Http\Requests\ImunisasiUpdateRequest;
use App\Models\Imunisasi;
use App\Repositories\Interfaces\ImunisasiRepositoryInterface;
use App\Repositories\Interfaces\PuskesmasRepositoryInterface;;
use Inertia\Inertia;

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
        $this->imunisasiRepository->getAllImunisasis();
        return Inertia::render('Admin/Imunisasi');
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
        // $request->validated();

        $dummyData = [
            'puskesmas_id' => 1,
            'nama' => 'Imunisasi Campak',
            'jenis' => 'Campak',
            'usia_minimum' => 9,
            'usia_maksimum' => 15,
            'tanggal' => '2025-03-25',
        ];

        $imunisasi = $this->imunisasiRepository->createImunisasi($request->all());

        event(new ImunisasiNotification($imunisasi));

        return Inertia::render('Admin/Imunisasi');
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
        $this->imunisasiRepository->getImunisasiById($id);
        return Inertia::render('Admin/Functions/Imunisasi/Edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ImunisasiUpdateRequest $request, $id)
    {
        $request->validated();

        $this->imunisasiRepository->updateImunisasi($id, $request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->imunisasiRepository->deleteImunisasi($id);
    }

    public function sendNotification($kota)
    {
        $imunisasi = Imunisasi::whereHas('puskesmas', function ($query) use ($kota) {
            $query->where('kota', $kota);
        })->with('puskesmas')->get();

        return response()->json($imunisasi);
    }
}
