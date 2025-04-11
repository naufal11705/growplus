<?php

namespace App\Http\Controllers;

use App\Http\Requests\FaseStoreRequest;
use App\Http\Requests\FaseUpdateRequest;
use App\Repositories\Interfaces\FaseRepositoryInterface;
use Inertia\Inertia;
use Exception;

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
        return Inertia::render('Admin/Fase', [
            'fase' => $this->faseRepository->getAllFase(),
            'hasAnak' => auth()->user()->orangtua->anak->count() > 0,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Functions/Fase/Tambah', [
            'fase' => $this->faseRepository->getAllFase()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FaseStoreRequest $request)
    {
        try {
            $validatedData = $request->validated();

            if ($request->hasFile('banner')) {
                $path = $request->file('banner')->store('banners', 'public');
                $validatedData['banner'] = $path;
            }

            $this->faseRepository->createFase($validatedData);

            return redirect()->route('fase.index')->with('success', 'Data berhasil ditambahkan.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Data gagal ditambahkan.');
        }
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
        return Inertia::render('Admin/Functions/Fase/Edit', [
            'fase' => $this->faseRepository->getFaseById($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FaseUpdateRequest $request, $id)
    {
        try {
            $validatedData = $request->validated();

            if ($request->hasFile('banner')) {
                $path = $request->file('banner')->store('banners', 'public');
                $validatedData['banner'] = $path;
            }

            $this->faseRepository->updateFase($id, $validatedData);

            return redirect()->route('fase.index')->with('success', 'Data berhasil diperbarui.');;
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Data gagal diperbarui.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->faseRepository->deleteFase($id);
    }
}
