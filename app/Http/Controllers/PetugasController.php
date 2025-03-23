<?php

namespace App\Http\Controllers;

use App\Models\Petugas;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PetugasController extends Controller
{
    public function imunisasi()
    {
        return Inertia::render('Petugas/Imunisasi');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function tambahImunisasi()
    {
        return Inertia::render('Petugas/Functions/Petugas/Tambah');
    }

    public function dashboard()
    {
        return Inertia::render('Petugas/Index');
    }

    public function profile()
    {
        $petugas = auth()->user();
        return Inertia::render('Petugas/Profile', [
            'petugas' => $petugas,
        ]);
    }
}
