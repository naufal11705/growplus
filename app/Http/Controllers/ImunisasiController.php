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
        $request->validated();

        $imunisasi = $this->imunisasiRepository->createImunisasi($request->all());

        event(new ImunisasiNotification($imunisasi));

        return redirect()->route('imunisasi.index');
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
        $request->validated();

        $this->imunisasiRepository->updateImunisasi($id, $request->all());

        return redirect()->route('imunisasi.index');
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
