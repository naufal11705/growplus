<?php

namespace App\Http\Controllers;

use App\Http\Requests\FaseStoreRequest;
use App\Http\Requests\FaseUpdateRequest;
use App\Repositories\Interfaces\FaseRepositoryInterface;
use Inertia\Inertia;

class FaseController extends Controller
{
    protected $faseRepository;

    public function __construct(FaseRepositoryInterface $faseRepository)
    {
        $this->faseRepository = $faseRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->faseRepository->getAllFase();
        return Inertia::render('Admin/Fase');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Functions/Fase/Tambah');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FaseStoreRequest $request)
    {
        $request->validated();

        $this->faseRepository->createFase($request->all());

        return Inertia::render('Admin/Fase');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $this->faseRepository->getFaseById($id);
        return Inertia::render('Admin/Fase/Show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $this->faseRepository->getFaseById($id);
        return Inertia::render('Admin/Functions/Fase/Edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FaseUpdateRequest $request, $id)
    {
        $request->validated();

        $this->faseRepository->updateFase($id, $request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->faseRepository->deleteFase($id);
    }
}
