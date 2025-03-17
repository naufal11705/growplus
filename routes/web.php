<?php

use App\Http\Controllers\AnakController;
use App\Http\Controllers\ArtikelController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PenggunaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TantanganController;
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
    Route::get('/user/tantangan', [TantanganController::class, 'index']);
    Route::get('/user/tantanganDetail', [TantanganController::class, 'show']);
    Route::get('/login', [PenggunaController::class, 'login']);
    Route::get('/register', [PenggunaController::class, 'register']);
    Route::get('/register/step', [PenggunaController::class, 'registerStep']);
    Route::get('/user/artikel', [ArtikelController::class, 'artikel']);
});

Route::get('/admin', function () {
    return Inertia::render('Admin/Index');
});


Route::get('/admin/artikel', function () {
    return Inertia::render('Admin/Artikel');
});
Route::get('/admin/artikel/tambah', function () {
    return Inertia::render('Admin/Functions/Artikel/Tambah');
});


Route::get('/admin/fase', function () {
    return Inertia::render('Admin/Fase');
});
Route::get('/admin/fase/tambah', function () {
    return Inertia::render('Admin/Functions/Fase/Tambah');
});


Route::get('/admin/tantangan', function () {
    return Inertia::render('Admin/Tantangan');
});
Route::get('/admin/tantangan/tambah', function () {
    return Inertia::render('Admin/Functions/Tantangan/Tambah');
});


Route::get('/admin/puskesmas', function () {
    return Inertia::render('Admin/Puskesmas');
});
Route::get('/admin/puskesmas/tambah', function () {
    return Inertia::render('Admin/Functions/Puskesmas/Tambah');
});


Route::get('/admin/imunisasi', function () {
    return Inertia::render('Admin/Imunisasi');
});
Route::get('/admin/imunisasi/tambah', function () {
    return Inertia::render('Admin/Functions/Imunisasi/Tambah');
});



Route::get('/admin/faskes', function () {
    return Inertia::render('Admin/Faskes');
});


require __DIR__ . '/auth.php';
