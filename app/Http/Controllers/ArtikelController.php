<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArtikelStoreRequest;
use App\Http\Requests\ImunisasiUpdateRequest;
use App\Repositories\Interfaces\ArtikelRepositoryInterface;
use Inertia\Inertia;

class ArtikelController extends Controller
{
    protected $artikelRepository;

    public function __construct(ArtikelRepositoryInterface $artikelRepository)
    {
        $this->artikelRepository = $artikelRepository;
    }
    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Artikel');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Functions/Artikel/Tambah');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ArtikelStoreRequest $request)
    {
        $request->validated();

        $this->artikelRepository->createArtikel($request->all());

        return Inertia::render('Admin/Artikel');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $this->artikelRepository->getArtikelById($id);
        return Inertia::render('Admin/Artikel/Show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $this->artikelRepository->getArtikelById($id);
        return Inertia::render('Admin/Functions/Artikel/Edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ImunisasiUpdateRequest $request, $id)
    {
        $request->validated();

        $this->artikelRepository->updateArtikel($id, $request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->artikelRepository->deleteArtikel($id);
    }
}
