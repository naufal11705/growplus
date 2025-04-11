<?php

namespace App\Repositories\Interfaces;

interface VoucherRepositoryInterface
{
    public function getAllVoucher();
    public function getVoucherById($id);
    public function createVoucher(array $data);
    public function updateVoucher($id, array $data);
    public function deleteVoucher($id);
}
