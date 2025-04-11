<?php

namespace App\Http\Controllers;

use App\Http\Requests\PenggunaTantanganDeleteRequest;
use App\Http\Requests\PenggunaTantanganStoreRequest;
use App\Models\PenggunaTantangan;
use App\Repositories\Interfaces\PenggunaRepositoryInterface;
use App\Repositories\Interfaces\PenggunaTantanganRepositoryInterface;
use App\Repositories\Interfaces\TantanganRepositoryInterface;
use Illuminate\Http\Request;

class PenggunaTantanganController extends Controller
{
    protected $penggunaTantanganRepository, $penggunaRepository, $tantanganRepository;

    public function __construct(
        PenggunaTantanganRepositoryInterface $penggunaTantanganRepository,
        PenggunaRepositoryInterface $penggunaRepository,
        TantanganRepositoryInterface $tantanganRepository,
    ) {
        $this->penggunaTantanganRepository = $penggunaTantanganRepository;
        $this->penggunaRepository = $penggunaRepository;
        $this->tantanganRepository = $tantanganRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PenggunaTantanganStoreRequest $request)
    {
        $validatedData = $request->validated();
        $pengguna = $this->penggunaRepository->getPenggunaById($validatedData['pengguna_id']);
        $tantangan = $this->tantanganRepository->getTantanganById($validatedData['tantangan_id']);

        $this->penggunaTantanganRepository->createPenggunaTantangans($validatedData);

        $pengguna->update([
            'total_point' => $pengguna->total_point + $tantangan->point
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(PenggunaTantangan $penggunaTantangan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PenggunaTantangan $penggunaTantangan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PenggunaTantangan $penggunaTantangan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PenggunaTantanganDeleteRequest $request)
    {
        $validatedData = $request->validated();

        $pengguna = $this->penggunaRepository->getPenggunaById($validatedData['pengguna_id']);
        $tantangan = $this->tantanganRepository->getTantanganById($validatedData['tantangan_id']);

        $this->penggunaTantanganRepository->deletePenggunaTantangans($validatedData);

        $pengguna->update([
            'total_point' => $pengguna->total_point - $tantangan->point
        ]);
    }
}
