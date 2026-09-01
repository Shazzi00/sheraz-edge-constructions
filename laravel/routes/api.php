<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\TeamMemberController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\ContactMessageController;
use App\Http\Controllers\Api\DashboardController;
/*
|--------------------------------------------------------------------------
| Public Routes (Client-Facing)
|--------------------------------------------------------------------------
*/

// Admin Authentication
Route::post('/admin/login', [AuthController::class, 'login']);

// Public Read Endpoints for Dynamic Components
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{id}', [ServiceController::class, 'show']);

Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{id}', [ProjectController::class, 'show']);

Route::get('/members', [TeamMemberController::class, 'index']);
Route::get('/members/{id}', [TeamMemberController::class, 'show']);

Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::get('/testimonials/{id}', [TestimonialController::class, 'show']); 

// Public Submission Endpoint for Contact Form
Route::post('/contact-messages', [ContactMessageController::class, 'store']);



// Public client form submission
Route::post('/contacts', [ContactMessageController::class, 'store']);

// Protected admin routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/contacts', [ContactMessageController::class, 'index']);
    Route::delete('/contacts/{id}', [ContactMessageController::class, 'destroy']);
});
/*
|--------------------------------------------------------------------------
| Protected Admin Routes (Requires Bearer Sanctum Token)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    // Auth Session Routes
    Route::post('/admin/logout', [AuthController::class, 'logout']);
    Route::get('/admin/me', function (Request $request) {
        return $request->user();
    });

    // Admin CRUD Operations (Excluding public methods)
    Route::apiResource('services', ServiceController::class)->except(['index', 'show']);
    Route::apiResource('projects', ProjectController::class)->except(['index', 'show']);
    Route::apiResource('members', TeamMemberController::class)->except(['index', 'show']);
    Route::apiResource('testimonials', TestimonialController::class)->except(['index']);
    
    // Admin Message Management (Excludes public store method)
    Route::apiResource('contact-messages', ContactMessageController::class)->except(['store']);

    

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/admin/stats', [DashboardController::class, 'stats']);
});
});