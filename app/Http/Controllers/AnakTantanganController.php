<?php

namespace App\Http\Controllers;

use App\Http\Requests\AnakTantanganDeleteRequest;
use App\Http\Requests\AnakTantanganStoreRequest;
use App\Models\AnakTantangan;
use App\Repositories\Interfaces\AnakRepositoryInterface;
use App\Repositories\Interfaces\AnakTantanganRepositoryInterface;
use App\Repositories\Interfaces\TantanganRepositoryInterface;
use Illuminate\Http\Request;

class AnakTantanganController extends Controller
{
    protected $anakTantanganRepository, $anakRepository, $tantanganRepository;

    public function __construct(
        AnakTantanganRepositoryInterface $anakTantanganRepository,
        AnakRepositoryInterface $anakRepository,
        TantanganRepositoryInterface $tantanganRepository,
    ) {
        $this->anakTantanganRepository = $anakTantanganRepository;
        $this->anakRepository = $anakRepository;
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
    public function store(AnakTantanganStoreRequest $request)
    {
        $validatedData = $request->validated();
        $pengguna = $this->anakRepository->getAnakById($validatedData['anak_id']);
        $tantangan = $this->tantanganRepository->getTantanganById($validatedData['tantangan_id']);

        if ($request->hasFile('gambar_url')) {
            $path = $request->file('gambar_url')->store('tantangan', 'public'); 
            $validatedData['gambar_url'] = $path;
        }

        $this->anakTantanganRepository->createAnakTantangans($validatedData);

        $pengguna->update([
            'total_point' => $pengguna->total_point + $tantangan->point
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(AnakTantangan $anakTantangan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AnakTantangan $anakTantangan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AnakTantangan $penggunaTantaanakTantanganngan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AnakTantanganDeleteRequest $request)
    {
        $validatedData = $request->validated();

        $pengguna = $this->anakRepository->getAnakById($validatedData['anak_id']);
        $tantangan = $this->tantanganRepository->getTantanganById($validatedData['tantangan_id']);

        $this->anakTantanganRepository->deleteAnakTantangans($validatedData);

        $pengguna->update([
            'total_point' => $pengguna->total_point - $tantangan->point
        ]);
    }
}
