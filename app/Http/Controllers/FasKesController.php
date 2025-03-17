<?php

namespace App\Http\Controllers;

use App\Http\Requests\FaskesStoreRequest;
use App\Http\Requests\FaskesUpdateRequest;
use App\Repositories\Interfaces\FasKesRepositoryInterface;
use Inertia\Inertia;

class FasKesController extends Controller
{
    protected $fasKesRepository;

    public function __construct(FasKesRepositoryInterface $fasKesRepository)
    {
        $this->fasKesRepository = $fasKesRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->fasKesRepository->getAllFasKes();
        return Inertia::render('Admin/Faskes');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Functions/Faskes/Tambah');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FaskesStoreRequest $request)
    {
        $request->validated();

        $this->fasKesRepository->createFasKes($request->all());

        return Inertia::render('Admin/Faskes');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $this->fasKesRepository->getFasKesById($id);
        return Inertia::render('Admin/Faskes/Show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $this->fasKesRepository->getFasKesById($id);
        return Inertia::render('Admin/Faskes/Edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FaskesUpdateRequest $request, $id)
    {
        $request->validated();

        $this->fasKesRepository->updateFasKes($id, $request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->fasKesRepository->deleteFasKes($id);
    }
}
