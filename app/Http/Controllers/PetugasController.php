<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PetugasController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Petugas/Index');
    }

    public function profile()
    {
        return Inertia::render('Petugas/Profile');
    }
}
