<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->check()) {
            return match (optional(auth()->user()->role->nama)) {
                'Admin' => redirect()->route('admin.dashboard'),
                'User' => redirect()->route('user.dashboard'),
                'Petugas' => redirect()->route('petugas.dashboard'),
                default => redirect()->route('home'),
            };
        }

        return $next($request);
    }
}
