<?php

namespace App\Http\Controllers;

use App\Models\Voucher;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Repositories\Interfaces\AnakTantanganRepositoryInterface;
use App\Repositories\Interfaces\VoucherRepositoryInterface;

class VoucherController extends Controller
{
    //
    protected $anakTantanganRepository, $voucherRepository;
    public function __construct(
        AnakTantanganRepositoryInterface $anakTantanganRepository,
        VoucherRepositoryInterface $voucherRepository
    ) {
        $this->anakTantanganRepository = $anakTantanganRepository;
        $this->voucherRepository = $voucherRepository;
    }

    public function index()
    {
        return Inertia::render('User/Voucher', [
            'vouchers' => $this->voucherRepository->getAllVoucher(),
            'total_point' => auth()->user()->pengguna->total_point,
        ]);
    }
}
