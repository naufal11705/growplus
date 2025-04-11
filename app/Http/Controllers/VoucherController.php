<?php

namespace App\Http\Controllers;

use App\Models\Voucher;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Repositories\Interfaces\PenggunaTantanganRepositoryInterface;

class VoucherController extends Controller
{
    //
    protected $penggunaTantanganRepository;

    public function __construct(
        PenggunaTantanganRepositoryInterface $penggunaTantanganRepository
    ) {
        $this->penggunaTantanganRepository = $penggunaTantanganRepository;
    }

    public function index()
    {
        $vouchers = Voucher::all();
        $pengguna_id = auth()->user()->pengguna_id;
        $totalPoints = $this->penggunaTantanganRepository->countTotalPoints($pengguna_id);

        return Inertia::render('User/Voucher', [
            'vouchers' => $vouchers,
            'totalPoints' => $totalPoints
        ]);
    }
}
