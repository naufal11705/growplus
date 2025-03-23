<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    public function render($request, Throwable $exception)
    {
        if ($request->header('X-Inertia')) {
            // Tangani 404 Not Found
            if ($exception instanceof NotFoundHttpException) {
                return Inertia::render('Error/404')->toResponse($request)->setStatusCode(404);
            }

            // Tangani 403 Forbidden
            if ($exception instanceof AccessDeniedHttpException) {
                return Inertia::render('Error/403')->toResponse($request)->setStatusCode(403);
            }

            // Tangani 500 Internal Server Error
            if ($exception instanceof HttpException) {
                $status = $exception->getStatusCode();

                if ($status === 500) {
                    return Inertia::render('Error/500')->toResponse($request)->setStatusCode(500);
                }
            }

            // Tangani Error Lain
            return Inertia::render('Error/500')->toResponse($request)->setStatusCode(500);
        }

        return parent::render($request, $exception);
    }
}
