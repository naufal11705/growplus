<?php

namespace App\Providers;

use App\Repositories\Interfaces\RoleRepositoryInterface;
use App\Repositories\RoleRepository;
use App\Repositories\Interfaces\PenggunaRepositoryInterface;
use App\Repositories\PenggunaRepository;
use App\Repositories\Interfaces\AnakRepositoryInterface;
use App\Repositories\AnakRepository;
use App\Repositories\FaseRepository;
use App\Repositories\Interfaces\FasKesRepositoryInterface;
use App\Repositories\FasKesRepository;
use App\Repositories\Interfaces\ImunisasiRepositoryInterface;
use App\Repositories\ImunisasiRepository;
use App\Repositories\Interfaces\ArtikelRepositoryInterface;
use App\Repositories\ArtikelRepository;
use App\Repositories\Interfaces\FaseRepositoryInterface;
use App\Repositories\Interfaces\OrangTuaRepositoryInterface;
use App\Repositories\OrangTuaRepository;
use App\Repositories\Interfaces\PuskesmasRepositoryInterface;
use App\Repositories\Interfaces\TantanganRepositoryInterface;
use App\Repositories\PuskesmasRepository;
use App\Repositories\TantanganRepository;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(RoleRepositoryInterface::class, RoleRepository::class);
        $this->app->bind(PenggunaRepositoryInterface::class, PenggunaRepository::class);
        $this->app->bind(AnakRepositoryInterface::class, AnakRepository::class);
        $this->app->bind(FasKesRepositoryInterface::class, FasKesRepository::class);
        $this->app->bind(ImunisasiRepositoryInterface::class, ImunisasiRepository::class);
        $this->app->bind(OrangTuaRepositoryInterface::class, OrangTuaRepository::class);
        $this->app->bind(PuskesmasRepositoryInterface::class, PuskesmasRepository::class);
        $this->app->bind(FaseRepositoryInterface::class, FaseRepository::class);
        $this->app->bind(TantanganRepositoryInterface::class, TantanganRepository::class);
        $this->app->bind(ArtikelRepositoryInterface::class, ArtikelRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
