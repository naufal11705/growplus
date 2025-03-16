<?php

use App\Http\Controllers\AnakController;
use App\Http\Controllers\ArtikelController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\PenggunaController;
use App\Http\Controllers\ProfileController;
use App\Models\Challenge;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/user', [PenggunaController::class, 'dashboard']);
Route::get('/user/chat-ai', [ChatController::class, 'index']);
Route::get('/user/perhitungan-stunting', [AnakController::class, 'perhitunganStunting']);
Route::get('/user/profile', [PenggunaController::class, 'profile']);
Route::get('/user/tantangan', [Challenge::class, 'index']);
Route::get('/user/tantangan/{challenge}', [Challenge::class, 'show']);
Route::get('/login', [PenggunaController::class, 'login']);
Route::get('/register', [PenggunaController::class, 'register']);
Route::get('/register/step', [PenggunaController::class, 'registerStep']);
Route::get('/user/artikel', [ArtikelController::class, 'artikel']);

require __DIR__ . '/auth.php';
