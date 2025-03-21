<?php

namespace App\Http\Controllers;

use App\Repositories\Interfaces\AnakRepositoryInterface;
use App\Repositories\Interfaces\OrangTuaRepositoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{

    protected $orangTuaRepository, $anakRepository;

    public function __construct(OrangTuaRepositoryInterface $orangTuaRepository, AnakRepositoryInterface $anakRepository)
    {
        $this->orangTuaRepository = $orangTuaRepository;
        $this->anakRepository = $anakRepository;
    }

    public function dashboard()
    {
        return Inertia::render('User/Dashboard');
    }

    public function profil()
    {
        return Inertia::render('User/Profil');
    }

    public function tantangan()
    {
        return Inertia::render('User/Tantangan');
    }

    public function tantanganDetail()
    {
        return Inertia::render('User/DetailTantangan');
    }

    public function artikel()
    {
        return Inertia::render('User/Artikel');
    }

    public function registerStepForm()
    {
        return Inertia::render('Auth/RegisterStep');
    }

    public function registerStep(Request $request)
    {
        return redirect()->route('user.dashboard');
    }
}
