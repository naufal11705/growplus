<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Interfaces\CatatanRepositoryInterface;
use App\Http\Requests\CatatanStoreRequest;
use App\Models\Catatan;

class CatatanController extends Controller
{
    protected $catatanRepository;

    public function __construct(CatatanRepositoryInterface $catatanRepository) 
    {
        $this->catatanRepository = $catatanRepository;
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
    public function store(CatatanStoreRequest $request)
    {
        $validatedData = $request->validated();

        $this->catatanRepository->createCatatans($validatedData);

        return response()->json([
            'message' => 'Catatan created successfully',
            'data' => $validatedData
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
