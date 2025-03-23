<?php

namespace App\Http\Controllers;

use App\Http\Resources\FaseResource;
use App\Models\Fase;
use App\Repositories\Interfaces\FaseRepositoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    protected $faseRepository;

    public function __construct(FaseRepositoryInterface $faseRepository)
    {
        $this->faseRepository = $faseRepository;
    }

    public function __invoke()
    {
        $fases = $this->faseRepository->getAllFase()->load('tantangans');

        return Inertia::render('Index', [
            'fases' => FaseResource::collection($fases)->toArray(request())
        ]);
    }
}
