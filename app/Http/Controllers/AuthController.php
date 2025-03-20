<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function login()
    {
        return Inertia::render('User/Login');
    }

    public function register()
    {
        return Inertia::render('User/Register');
    }

    public function registerStep()
    {
        return Inertia::render('Auth/RegisterStep');
    }
}
