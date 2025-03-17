<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Index');
    }

    public function tantangan()
    {
        return Inertia::render('User/Tantangan');
    }

    public function tantanganDetail()
    {
        return Inertia::render('User/DetailTantangan');
    }

    public function artikel()
    {
        return Inertia::render('User/Artikel');
    }
}
