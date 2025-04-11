<?php

namespace App\Http\Controllers;

use App\Repositories\Interfaces\PenggunaRepositoryInterface;
use App\Models\Pengguna;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PenggunaController extends Controller
{
    protected $penggunaRepository;

    public function __construct(PenggunaRepositoryInterface $penggunaRepository)
    {
        $this->penggunaRepository = $penggunaRepository;
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Pengguna $pengguna)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pengguna $pengguna)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pengguna $pengguna)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->penggunaRepository->deletePengguna($id);
        
    }
    public function getUserForChat()
    {
        $pengguna = $this->penggunaRepository->findById(3);

        if (!$pengguna) {
            abort(404, 'Pengguna tidak ditemukan');
        }

        return Inertia::render('User/ChatPetugas', [
            'user' => [
                'pengguna_id' => $pengguna->pengguna_id,
                'email' => $pengguna->email,
            ],
        ]);
    }
}
