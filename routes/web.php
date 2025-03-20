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

Route::get('/', HomeController::class);
Route::get('/login', [PenggunaController::class, 'login']);
Route::get('/register', [PenggunaController::class, 'register']);
Route::get('/register/step', [PenggunaController::class, 'registerStep']);

Route::group([], function () {
    Route::get('/dashboard', [PenggunaController::class, 'dashboard']);
    Route::get('/chat-ai', [ChatController::class, 'index']);
    Route::get('/perhitungan-stunting', [AnakController::class, 'perhitunganStunting']);
    Route::get('/profile', [PenggunaController::class, 'profile']);
    Route::get('/tantangan', [HomeController::class, 'tantangan']);
    Route::get('/tantanganDetail', [HomeController::class, 'tantanganDetail']);
    Route::get('/artikel', [HomeController::class, 'artikel']);
});

Route::group(['prefix' => 'admin'], function () {
    Route::get('/dashboard', [PenggunaController::class, 'dashboard']);

    Route::get('/puskesmas', [PuskesmasController::class, 'index']);
    Route::get('/puskesmas/tambah', [PuskesmasController::class, 'create']);
    Route::post('/puskesmas', [PuskesmasController::class, 'store']);
    Route::put('/puskesmas/{id}', [PuskesmasController::class, 'update']);
    Route::delete('/puskesmas/{id}', [PuskesmasController::class, 'destroy']);

    Route::get('/faskes', [FasKesController::class, 'index']);
    Route::get('/faskes/tambah', [FasKesController::class, 'create']);
    Route::post('/faskes', [FasKesController::class, 'store']);
    Route::put('/faskes/{id}', [FasKesController::class, 'update']);
    Route::delete('/faskes/{id}', [FasKesController::class, 'destroy']);

    Route::get('/imunisasi', [ImunisasiController::class, 'index']);
    Route::get('/imunisasi/tambah', [ImunisasiController::class, 'create']);
    Route::post('/imunisasi', [ImunisasiController::class, 'store']);
    Route::put('/imunisasi/{id}', [ImunisasiController::class, 'update']);
    Route::delete('/imunisasi/{id}', [ImunisasiController::class, 'destroy']);

    Route::get('/fase', [FaseController::class, 'index']);
    Route::get('/fase/tambah', [FaseController::class, 'create']);
    Route::post('/fase', [FaseController::class, 'store']);
    Route::put('/fase/{id}', [FaseController::class, 'update']);
    Route::delete('/fase/{id}', [FaseController::class, 'destroy']);

    Route::get('/artikel', [ArtikelController::class, 'index']);
    Route::get('/artikel/tambah', [ArtikelController::class, 'create']);
    Route::post('/artikel', [ArtikelController::class, 'store']);
    Route::put('/artikel/{id}', [ArtikelController::class, 'update']);
    Route::delete('/artikel/{id}', [ArtikelController::class, 'destroy']);

    Route::get('/tantangan', [TantanganController::class, 'index']);
    Route::get('/tantangan/tambah', [TantanganController::class, 'create']);
    Route::post('/tantangan', [TantanganController::class, 'store']);
    Route::put('/tantangan/{id}', [TantanganController::class, 'update']);
    Route::delete('/tantangan/{id}', [TantanganController::class, 'destroy']);
});

Route::group(['prefix' => 'petugas'], function () {
    Route::get('/dashboard', [PenggunaController::class, 'dashboard']);
});

Route::get('/petugas/imunisasi', function () {
    return Inertia::render('Petugas/Imunisasi');
});
Route::get('/petugas/imunisasi/tambah', function () {
    return Inertia::render('Petugas/Functions/Petugas/Tambah');
});

require __DIR__ . '/auth.php';
