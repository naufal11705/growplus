<?php

namespace App\Http\Controllers;

use App\Http\Requests\FaskesStoreRequest;
use App\Http\Requests\FaskesUpdateRequest;
use App\Repositories\Interfaces\FasKesRepositoryInterface;
use App\Repositories\Interfaces\OrangTuaRepositoryInterface;
use App\Repositories\Interfaces\PuskesmasRepositoryInterface;
use Inertia\Inertia;
use Exception;

class FasKesController extends Controller
{
    protected $fasKesRepository;
    protected $puskesmasRepository;
    protected $orangTuaRepository;

    public function __construct(FasKesRepositoryInterface $fasKesRepository, PuskesmasRepositoryInterface $puskesmasRepository, OrangTuaRepositoryInterface $orangTuaRepository)
    {
        $this->fasKesRepository = $fasKesRepository;
        $this->puskesmasRepository = $puskesmasRepository;
        $this->orangTuaRepository = $orangTuaRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Faskes', [
            'faskes' => $this->fasKesRepository->getAllFasKes()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Functions/Faskes/Tambah', [
            'puskesmas' => $this->puskesmasRepository->getAllPuskesmas(),
            'orangtua' => $this->orangTuaRepository->getAllOrangTua()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FaskesStoreRequest $request)
    {
        try {
            $validatedData = $request->validated();

            $this->fasKesRepository->createFasKes($validatedData);
    
            return redirect()->route('faskes.index')->with('success', 'Data berhasil ditambahkan.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Data gagal ditambahkan.');
        }
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
        return Inertia::render('Admin/Functions/Faskes/Edit', [
            'puskesmas' => $this->puskesmasRepository->getAllPuskesmas(),
            'orangtua' => $this->orangTuaRepository->getAllOrangTua(),
            'faskes' => $this->fasKesRepository->getFaskesById($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FaskesUpdateRequest $request, $id)
    {
        try {
            $validatedData = $request->validated();

            $this->fasKesRepository->updateFasKes($id, $validatedData);
    
            return redirect()->route('faskes.index')->with('success', 'Data berhasil diperbarui.');;
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Data gagal diperbarui.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->fasKesRepository->deleteFasKes($id);
    }
}
