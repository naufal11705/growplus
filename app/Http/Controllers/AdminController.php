<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Admin/Index');
    }

    public function profile()
    {
        return Inertia::render('Admin/Profile');
    }
}
