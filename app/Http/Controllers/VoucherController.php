<?php

namespace App\Http\Controllers;

use App\Models\Voucher;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Repositories\Interfaces\AnakTantanganRepositoryInterface;

class VoucherController extends Controller
{
    //
    protected $anakTantanganRepository;

    public function __construct(
        AnakTantanganRepositoryInterface $anakTantanganRepository
    ) {
        $this->anakTantanganRepository = $anakTantanganRepository;
    }

    public function index()
    {
        $vouchers = Voucher::all();
        $pengguna_id = auth()->user()->pengguna_id;
        $totalPoints = $this->anakTantanganRepository->countTotalPoints($pengguna_id);

        return Inertia::render('User/Voucher', [
            'vouchers' => $vouchers,
            'totalPoints' => $totalPoints
        ]);
    }
}
