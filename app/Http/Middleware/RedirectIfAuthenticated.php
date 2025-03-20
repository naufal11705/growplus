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
                'admin' => redirect()->route('admin.dashboard'),
                'user' => redirect()->route('user.dashboard'),
                'petugas' => redirect()->route('petugas.dashboard'),
                default => redirect()->route('home'),
            };
        }

        return $next($request);
    }
}
