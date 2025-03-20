<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImunisasiUpdateRequest;
use App\Http\Requests\TantanganStoreRequest;
use App\Repositories\Interfaces\ImunisasiRepositoryInterface;
use App\Repositories\Interfaces\FaseRepositoryInterface;
use App\Repositories\Interfaces\TantanganRepositoryInterface;
use Inertia\Inertia;

class TantanganController extends Controller
{
    protected $tantanganRepository;
    protected $faseRepository;

    public function __construct(TantanganRepositoryInterface $tantanganRepository, FaseRepositoryInterface $faseRepository)
    {
        $this->tantanganRepository = $tantanganRepository;
        $this->faseRepository = $faseRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->tantanganRepository->getAllTantangan();
        return Inertia::render('Admin/Tantangan');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Functions/Tantangan/Tambah', [
            'fase' => $this->faseRepository->getAllFase()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TantanganStoreRequest $request)
    {
        $request->validated();

        $this->tantanganRepository->createTantangan($request->all());

        return Inertia::render('Admin/Tantangan');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $this->tantanganRepository->getTantanganById($id);
        return Inertia::render('Admin/Tantangan/Show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $this->tantanganRepository->getTantanganById($id);
        return Inertia::render('Admin/Functions/Tantangan/Edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ImunisasiUpdateRequest $request, $id)
    {
        $request->validated();

        $this->tantanganRepository->updateTantangan($id, $request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->tantanganRepository->deleteTantangan($id);
    }
}
