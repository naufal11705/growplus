<?php

namespace Database\Seeders;

use App\Models\Voucher;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VoucherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $dataVoucher = [
            [
                'voucher_id' => '1',
                'title' => 'Voucher Diskon 25%',
                'description' => 'Potongan harga untuk peralatan bayi',
                'points_cost' => 200,
                'validity' => 'Berlaku hingga: 15 Mei 2025',
                'expiry_date' => '2025-05-15',
                'terms' => json_encode([
                    'Berlaku di toko Mothercare yang berpartisipasi',
                    'Tidak dapat digabungkan dengan penawaran lain',
                    'Tidak ada nilai tunai',
                    'Satu kupon per pelanggan per kunjungan',
                ]),
                'code' => 'MOTHCR25',
                'provider' => 'Mothercare Indonesia',
                'logo_url' => 'https://scontent.fmlg1-1.fna.fbcdn.net/v/t39.30808-6/351453684_168673735981465_8523348896501344605_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=vQ6010FxkeEQ7kNvwEH_j0x&_nc_oc=AdlZYuOpZtJWNzHlnOq09De673mVh0K0YMz1oWeEuFCOVyR0cyR6BKsgboF8KLJg0eo&_nc_zt=23&_nc_ht=scontent.fmlg1-1.fna&_nc_gid=vNoJST6x_5-NcTT8CmEEGA&oh=00_AfHjDYZGU4G6cMYV4LimCn2JynLgE9tGhcK4pUKpZt44fg&oe=67FB7C14',
                'provider_url' => 'https://www.mothercare.co.id',
                'redeem_date' => '2025-04-08',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'voucher_id' => '2',
                'title' => 'Voucher Diskon 15%',
                'description' => 'Potongan harga untuk produk ibu hamil',
                'points_cost' => 20,
                'validity' => 'Berlaku selama 30 hari sejak penukaran',
                'expiry_date' => '2025-05-08',
                'terms' => json_encode([
                    'Berlaku untuk satu paket sayuran segar',
                    'Harus membeli produk ibu hamil',
                    'lina berlaku di Sayurbox',
                    'Tidak ada pengganti',
                ]),
                'code' => 'BOX15',
                'provider' => 'Sayurbox',
                'logo_url' => 'https://play-lh.googleusercontent.com/mUz0vl7uNQTxDXI6YuDNz6sIn8HmSA90ZVoEbPIjpyMhoh28oyt6M80SCMf5bpRCl6I',
                'provider_url' => 'https://www.sayurbox.com',
                'redeem_date' => '2025-04-08',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'voucher_id' => '3',
                'title' => 'Voucher Diskon 20%',
                'description' => 'Potongan harga untuk belanja sehat',
                'points_cost' => 30,
                'validity' => 'Berlaku selama 14 hari sejak penukaran',
                'expiry_date' => '2025-04-22',
                'terms' => json_encode([
                    'Hanya untuk produk dengan harga normal',
                    'Tidak dapat digabungkan dengan promosi lain',
                    'Tidak termasuk kartu hadiah',
                    'Sekali pakai',
                ]),
                'code' => 'TANIHUB20',
                'provider' => 'TaniHub',
                'logo_url' => 'https://cdn.brandfetch.io/id0oVx9aqi/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1667903403756',
                'provider_url' => 'https://www.tanihub.com',
                'redeem_date' => '2025-04-08',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($dataVoucher as $voucher) {
            Voucher::create($voucher);
        }
    }
}
