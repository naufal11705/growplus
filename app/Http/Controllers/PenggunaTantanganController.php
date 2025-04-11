<?php

namespace App\Http\Controllers;

use App\Http\Requests\PenggunaTantanganDeleteRequest;
use App\Http\Requests\PenggunaTantanganStoreRequest;
use App\Models\PenggunaTantangan;
use App\Repositories\Interfaces\PenggunaTantanganRepositoryInterface;
use Illuminate\Http\Request;

class PenggunaTantanganController extends Controller
{
    protected $penggunaTantanganRepository;

    public function __construct(PenggunaTantanganRepositoryInterface $penggunaTantanganRepository)
    {
        $this->penggunaTantanganRepository = $penggunaTantanganRepository;
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

        $this->penggunaTantanganRepository->createPenggunaTantangans($validatedData);
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

        $this->penggunaTantanganRepository->deletePenggunaTantangans($validatedData);
    }
}
