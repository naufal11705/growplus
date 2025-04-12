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
use App\Repositories\Interfaces\AnakTantanganRepositoryInterface;
use App\Repositories\OrangTuaRepository;
use App\Repositories\Interfaces\PuskesmasRepositoryInterface;
use App\Repositories\Interfaces\TantanganRepositoryInterface;
use App\Repositories\AnakTantanganRepository;
use App\Repositories\PuskesmasRepository;
use App\Repositories\TantanganRepository;
use App\Repositories\Interfaces\CatatanRepositoryInterface;
use App\Repositories\CatatanRepository;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(RoleRepositoryInterface::class, RoleRepository::class);
        $this->app->singleton(PenggunaRepositoryInterface::class, PenggunaRepository::class);
        $this->app->singleton(AnakRepositoryInterface::class, AnakRepository::class);
        $this->app->singleton(FasKesRepositoryInterface::class, FasKesRepository::class);
        $this->app->singleton(ImunisasiRepositoryInterface::class, ImunisasiRepository::class);
        $this->app->singleton(OrangTuaRepositoryInterface::class, OrangTuaRepository::class);
        $this->app->singleton(PuskesmasRepositoryInterface::class, PuskesmasRepository::class);
        $this->app->singleton(FaseRepositoryInterface::class, FaseRepository::class);
        $this->app->singleton(TantanganRepositoryInterface::class, TantanganRepository::class);
        $this->app->singleton(ArtikelRepositoryInterface::class, ArtikelRepository::class);
        $this->app->singleton(AnakTantanganRepositoryInterface::class, AnakTantanganRepository::class);
        $this->app->singleton(CatatanRepositoryInterface::class, CatatanRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        Inertia::share([
            'auth' => function () {
                if (auth()->user()) {
                    return [
                        'user' => [
                            'id' => auth()->user()->id,
                            'kecamatan' => auth()->user()->orangtua->kecamatan,
                        ],
                    ];
                }
                return ['user' => null];
            },
        ]);
    }
}
