<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Repositories\Interfaces\PenggunaRepositoryInterface;
use App\Repositories\Interfaces\PuskesmasRepositoryInterface;
use App\Repositories\Interfaces\OrangTuaRepositoryInterface;
use App\Repositories\Interfaces\TantanganRepositoryInterface;

class AdminController extends Controller
{
    protected $penggunaRepository, $puskesmasRepository, $orangTuaRepository, $tantanganRepository;

    public function __construct(PenggunaRepositoryInterface $penggunaRepository, PuskesmasRepositoryInterface $puskesmasRepository, OrangTuaRepositoryInterface $orangTuaRepository, TantanganRepositoryInterface $tantanganRepository)
    {
        $this->penggunaRepository = $penggunaRepository;
        $this->puskesmasRepository = $puskesmasRepository;
        $this->orangTuaRepository = $orangTuaRepository;
        $this->tantanganRepository = $tantanganRepository;
    }

    public function dashboard()
    {
        return Inertia::render('Admin/Index', [
            'pengguna' => $this->penggunaRepository->getAllPenggunas(),
            'puskesmas' => $this->puskesmasRepository->countPuskesmas(),
            'orangtua' => $this->orangTuaRepository->countOrangTua(),
            'tantangan' => $this->tantanganRepository->countTantangan(),
        ]);
    }

    public function profile()
    {
        $admin = auth()->user();
        return Inertia::render('Admin/Profile', [
            'admin' => $admin,
        ]);
    }
}
