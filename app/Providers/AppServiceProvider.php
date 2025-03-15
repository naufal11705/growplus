<?php

namespace App\Providers;

use App\Repositories\Interfaces\RoleRepositoryInterface;
use App\Repositories\RoleRepository;
use App\Repositories\Interfaces\PenggunaRepositoryInterface;
use App\Repositories\PenggunaRepository;
use App\Repositories\Interfaces\AnakRepositoryInterface;
use App\Repositories\AnakRepository;
use App\Repositories\Interfaces\FasKesRepositoryInterface;
use App\Repositories\FasKesRepository;
use App\Repositories\Interfaces\ImunisasiRepositoryInterface;
use App\Repositories\ImunisasiRepository;
use App\Repositories\Interfaces\OrangTuaRepositoryInterface;
use App\Repositories\OrangTuaRepository;
use App\Repositories\Interfaces\PuskesmasRepositoryInterface;
use App\Repositories\PuskesmasRepository;
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
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
