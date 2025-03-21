<?php

use App\Http\Controllers\AnakController;
use App\Http\Controllers\ArtikelController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PenggunaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TantanganController;
use App\Http\Controllers\PuskesmasController;
use App\Http\Controllers\FasKesController;
use App\Http\Controllers\ImunisasiController;
use App\Http\Controllers\FaseController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Index', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', HomeController::class);

Route::group([], function () {
    Route::get('/user', [PenggunaController::class, 'dashboard']);
    Route::get('/user/chat-ai', [ChatController::class, 'index']);
    Route::get('/user/perhitungan-stunting', [AnakController::class, 'perhitunganStunting']);
    Route::get('/user/profile', [PenggunaController::class, 'profile']);
    Route::get('/user/tantangan', [HomeController::class, 'tantangan']);
    Route::get('/user/tantanganDetail', [HomeController::class, 'tantanganDetail']);
    Route::get('/login', [PenggunaController::class, 'login']);
    Route::get('/register', [PenggunaController::class, 'register']);
    Route::get('/register/step', [PenggunaController::class, 'registerStep']);
    Route::get('/user/artikel', [HomeController::class, 'artikel']);
});

Route::group([], function () {
    Route::get('/admin/puskesmas', [PuskesmasController::class, 'index']);
    Route::get('/admin/puskesmas/tambah', [PuskesmasController::class, 'create']);
    Route::post('/admin/puskesmas', [PuskesmasController::class, 'store']);
    Route::put('/admin/puskesmas/{id}', [PuskesmasController::class, 'update']);
    Route::delete('/admin/puskesmas/{id}', [PuskesmasController::class, 'destroy']);

    Route::get('/admin/faskes', [FasKesController::class, 'index']);
    Route::get('/admin/faskes/tambah', [FasKesController::class, 'create']);
    Route::post('/admin/faskes', [FasKesController::class, 'store']);
    Route::put('/admin/faskes/{id}', [FasKesController::class, 'update']);
    Route::delete('/admin/faskes/{id}', [FasKesController::class, 'destroy']);

    Route::get('/admin/imunisasi', [ImunisasiController::class, 'index']);
    Route::get('/admin/imunisasi/tambah', [ImunisasiController::class, 'create']);
    Route::post('/admin/imunisasi', [ImunisasiController::class, 'store']);
    Route::put('/admin/imunisasi/{id}', [ImunisasiController::class, 'update']);
    Route::delete('/admin/imunisasi/{id}', [ImunisasiController::class, 'destroy']);
    Route::get('/admin/imunisasi/{kota}', [ImunisasiController::class, 'sendNotification']);

    Route::get('/admin/fase', [FaseController::class, 'index']);
    Route::get('/admin/fase/tambah', [FaseController::class, 'create']);
    Route::post('/admin/fase', [FaseController::class, 'store']);
    Route::put('/admin/fase/{id}', [FaseController::class, 'update']);
    Route::delete('/admin/fase/{id}', [FaseController::class, 'destroy']);

    Route::get('/admin/artikel', [ArtikelController::class, 'index']);
    Route::get('/admin/artikel/tambah', [ArtikelController::class, 'create']);
    Route::post('/admin/artikel', [ArtikelController::class, 'store']);
    Route::put('/admin/artikel/{id}', [ArtikelController::class, 'update']);
    Route::delete('/admin/artikel/{id}', [ArtikelController::class, 'destroy']);

    Route::get('/admin/tantangan', [TantanganController::class, 'index']);
    Route::get('/admin/tantangan/tambah', [TantanganController::class, 'create']);
    Route::post('/admin/tantangan', [TantanganController::class, 'store']);
    Route::put('/admin/tantangan/{id}', [TantanganController::class, 'update']);
    Route::delete('/admin/tantangan/{id}', [TantanganController::class, 'destroy']);
});

Route::get('/admin', function () {
    return Inertia::render('Admin/Index');
});

Route::get('/petugas', function () {
    return Inertia::render('Petugas/Index');
});
Route::get('/petugas/imunisasi', function () {
    return Inertia::render('Petugas/Imunisasi');
});
Route::get('/petugas/imunisasi/tambah', function () {
    return Inertia::render('Petugas/Functions/Petugas/Tambah');
});

require __DIR__ . '/auth.php';
