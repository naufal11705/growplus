<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrangTuaStoreRequest;
use App\Http\Requests\OrangTuaUpdateRequest;
use App\Models\OrangTua;
use App\Repositories\Interfaces\OrangTuaRepositoryInterface;
use App\Repositories\Interfaces\PenggunaRepositoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrangTuaController extends Controller
{
    protected $orangTuaRepository;
    protected $penggunaRepository;

    public function __construct(OrangTuaRepositoryInterface $orangTuaRepository, PenggunaRepositoryInterface $penggunaRepository)
    {
        $this->orangTuaRepository = $orangTuaRepository;
        $this->penggunaRepository = $penggunaRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/OrangTua',
        ['orangtua' => $this->orangTuaRepository->getAllOrangTua()
    ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Functions/OrangTua/Tambah', [
            'orangtua' => $this->orangTuaRepository->getAllOrangTua(),
            'pengguna' => $this->penggunaRepository->getAllPenggunas()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OrangTuaStoreRequest $request)
    {
        $validatedData = $request->validated();

        $this->orangTuaRepository->createOrangTua($validatedData);

        return redirect()->route('orangtua.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(OrangTua $orangTua)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return Inertia::render('Admin/Functions/OrangTua/Edit', [
            'orangtua' => $this->orangTuaRepository->getOrangTuaById($id),
            'pengguna' => $this->penggunaRepository->getAllPenggunas()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(OrangTuaUpdateRequest $request, $id)
    {
        $request->validated();

        $this->orangTuaRepository->updateOrangTua($id, $request->all());

        return redirect()->route('orangtua.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->orangTuaRepository->deleteOrangTua($id);
    }
}
