<?php

namespace App\Http\Controllers;

use App\Http\Requests\PuskesmasStoreRequest;
use App\Http\Requests\PuskesmasUpdateRequest;
use App\Repositories\Interfaces\PuskesmasRepositoryInterface;
use Inertia\Inertia;

class PuskesmasController extends Controller
{

    protected $puskesmasRepository;

    public function __construct(PuskesmasRepositoryInterface $puskesmasRepository)
    {
        $this->puskesmasRepository = $puskesmasRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->puskesmasRepository->getAllPuskesmas();
        return Inertia::render('Admin/Puskesmas');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Functions/Puskesmas/Tambah');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PuskesmasStoreRequest $request)
    {
        $request->validated();

        $this->puskesmasRepository->createPuskesmas($request->all());

        return Inertia::render('Admin/Puskesmas');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $this->puskesmasRepository->getPuskesmasById($id);
        return Inertia::render('Admin/Puskesmas/Show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $this->puskesmasRepository->getPuskesmasById($id);
        return Inertia::render('Admin/Puskesmas/Edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PuskesmasUpdateRequest $request, $id)
    {
        $request->validated();

        $this->puskesmasRepository->updatePuskesmas($id, $request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->puskesmasRepository->deletePuskesmas($id);
    }
}
