<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrangTuaStoreRequest;
use App\Http\Requests\OrangTuaUpdateRequest;
use App\Models\OrangTua;
use App\Repositories\Interfaces\OrangTuaRepositoryInterface;
use Illuminate\Http\Request;

class OrangTuaController extends Controller
{
    protected $orangTuaRepository;

    public function __construct(OrangTuaRepositoryInterface $orangTuaRepository)
    {
        $this->orangTuaRepository = $orangTuaRepository;
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
    public function store(OrangTuaStoreRequest $request)
    {
        $validatedData = $request->validated();

        $this->orangTuaRepository->createOrangTua($validatedData);

        return redirect()->route('orang_tua.index');
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
    public function edit(OrangTua $orangTua)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, OrangTua $orangTua)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrangTua $orangTua)
    {
        //
    }
}
