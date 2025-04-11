<?php

namespace App\Repositories;

use App\Models\Voucher;
use App\Repositories\Interfaces\VoucherRepositoryInterface;

class VoucherRepository implements VoucherRepositoryInterface
{

    public function getAllVoucher()
    {
        return Voucher::all();
    }

    public function getVoucherById($id)
    {
        return Voucher::findOrFail($id);
    }

    public function createVoucher(array $data)
    {
        return Voucher::create($data);
    }

    public function updateVoucher($id, array $data)
    {
        $voucher = Voucher::findOrFail($id);
        $voucher->update($data);
        return $voucher;
    }

    public function deleteVoucher($id)
    {
        $voucher = Voucher::findOrFail($id);
        return $voucher->delete();
    }
}
