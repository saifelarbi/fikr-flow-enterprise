<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Handle preflight requests
        if ($request->getMethod() === 'OPTIONS') {
            return response('', 200)
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH')
                ->header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, Accept, X-Requested-With')
                ->header('Access-Control-Max-Age', '3600');
        }

        $response = $next($request);

        return $response
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH')
            ->header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, Accept, X-Requested-With')
            ->header('Access-Control-Max-Age', '3600');
    }
}
