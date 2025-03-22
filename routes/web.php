<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AnakController;
use App\Http\Controllers\ArtikelController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PenggunaController;
use App\Http\Controllers\PetugasController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TantanganController;
use App\Http\Controllers\PuskesmasController;
use App\Http\Controllers\FasKesController;
use App\Http\Controllers\ImunisasiController;
use App\Http\Controllers\FaseController;
use App\Http\Controllers\OrangTuaController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\RedirectIfAuthenticated;
use App\Http\Middleware\RegisterOrangtuaMiddleware;
use App\Http\Middleware\RoleMiddleware;
use App\Models\Artikel;
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

Route::get('/', HomeController::class)->name('home');

Route::middleware(RedirectIfAuthenticated::class)->group(function () {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);

    Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('/register', [RegisteredUserController::class, 'store']);

    Route::get('/forgot-password', [PasswordResetLinkController::class, 'create'])->name('password.request');
    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])->name('password.email');

    Route::get('/reset-password/{token}', [NewPasswordController::class, 'create'])->name('password.reset');
    Route::post('/reset-password', [NewPasswordController::class, 'store'])->name('password.update');
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});

Route::middleware(['auth'])->group(function () {
    Route::middleware([RoleMiddleware::class . ':User'])->group(function () {
        Route::post('/register-step', [UserController::class, 'registerStep']);
        Route::get('/register-step', [UserController::class, 'registerStepForm'])->name('register.step.form');

        Route::middleware([RegisterOrangtuaMiddleware::class])->group(function () {
            Route::get('/dashboard', [UserController::class, 'dashboard'])->name('user.dashboard');
            Route::get('/chat-ai', [ChatController::class, 'index']);
            Route::get('/perhitungan-stunting', [AnakController::class, 'perhitunganStunting']);
            Route::get('/profil', [UserController::class, 'profil']);
            Route::get('/tantangan', [UserController::class, 'tantangan']);
            Route::get('/tantanganDetail', [UserController::class, 'tantanganDetail']);
            Route::get('/artikel', [UserController::class, 'artikel']);
        });
    });

    Route::prefix('admin')->middleware(RoleMiddleware::class . ':Admin')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');

        Route::resource('puskesmas', PuskesmasController::class);
        Route::resource('faskes', FasKesController::class);
        Route::resource('imunisasi', ImunisasiController::class);
        Route::resource('fase', FaseController::class);
        Route::resource('artikel', ArtikelController::class);
        Route::resource('tantangan', TantanganController::class);
        Route::resource('orangtua', OrangTuaController::class);
        Route::resource('anak', AnakController::class);
    });

    Route::prefix('petugas')->middleware(RoleMiddleware::class . ':Petugas')->group(function () {
        Route::get('/dashboard', [PetugasController::class, 'dashboard'])->name('petugas.dashboard');
    });
});

Route::prefix('petugas')->middleware(RoleMiddleware::class . ':Petugas')->group(function () {
    Route::get('/dashboard', [PetugasController::class, 'dashboard'])->name('petugas.dashboard');
});

Route::get('/petugas/imunisasi', function () {
    return Inertia::render('Petugas/Imunisasi');
});
Route::get('/petugas/imunisasi/tambah', function () {
    return Inertia::render('Petugas/Functions/Petugas/Tambah');
});

Route::get('/admin/artikel/{id}/edit', [ArtikelController::class, 'edit'])->name('admin.artikel.edit');

Route::get('/artikel', [ArtikelController::class, 'listArticles'])->name('artikel.listArticles');
Route::get('/detail-artikel/{slug}', [ArtikelController::class, 'showArticle'])->name('artikel.showArticle');

Route::get('/profil/edit', function () {
    return Inertia::render('User/Functions/Profile/Edit_OrangTua');
});

require __DIR__ . '/auth.php';
