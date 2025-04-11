<?php

namespace App\Http\Controllers;

use App\Http\Requests\PuskesmasStoreRequest;
use App\Http\Requests\PuskesmasUpdateRequest;
use App\Repositories\Interfaces\PuskesmasRepositoryInterface;
use Exception;
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
        return Inertia::render('Admin/Puskesmas',
            ['puskesmas' => $this->puskesmasRepository->getAllPuskesmas()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Functions/Puskesmas/Tambah',
            ['puskesmas' => $this->puskesmasRepository->getAllPuskesmas()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PuskesmasStoreRequest $request)
    {
        try {
            $validatedData = $request->validated();

            $this->puskesmasRepository->createPuskesmas($validatedData);
    
            return redirect()->route('puskesmas.index')->with('success', 'Data berhasil ditambahkan.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Data gagal ditambahkan.');
        }
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
        return Inertia::render('Admin/Functions/Puskesmas/Edit',
            ['puskesmas' => $this->puskesmasRepository->getPuskesmasById($id)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PuskesmasUpdateRequest $request, $id)
    {
        try {
            $validatedData = $request->validated();

            $this->puskesmasRepository->updatePuskesmas($id, $validatedData);
    
            return redirect()->route('puskesmas.index')->with('success', 'Data berhasil diperbarui.');;
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Data gagal diperbarui.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->puskesmasRepository->deletePuskesmas($id);
        
    }
}
