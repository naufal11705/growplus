<?php

namespace App\Http\Controllers;

use App\Models\Pengguna;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PenggunaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Pengguna $pengguna)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pengguna $pengguna)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pengguna $pengguna)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pengguna $pengguna)
    {
        //
    }

    public function dashboard()
    {
        return Inertia::render('User/Dashboard');
    }

    public function profile()
    {
        return Inertia::render('User/Profile');
    }

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
        return Inertia::render('User/RegisterStep');
    }
}
