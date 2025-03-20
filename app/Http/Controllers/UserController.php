<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('User/Dashboard');
    }

    public function profile()
    {
        return Inertia::render('User/Profile');
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
