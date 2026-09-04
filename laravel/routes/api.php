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

// Public Read Endpoints
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{id}', [ServiceController::class, 'show']);

Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{id}', [ProjectController::class, 'show']);

Route::get('/members', [TeamMemberController::class, 'index']);
Route::get('/members/{id}', [TeamMemberController::class, 'show']);

Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::get('/testimonials/{id}', [TestimonialController::class, 'show']);

// Public Contact Form Submissions (Handles both /contact-messages and /contacts)
Route::post('/contact-messages', [ContactMessageController::class, 'store']);
Route::post('/contacts', [ContactMessageController::class, 'store']);

/*
|--------------------------------------------------------------------------
| Protected Admin Routes (Requires Bearer Sanctum Token)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    // Auth Session
    Route::post('/admin/logout', [AuthController::class, 'logout']);
    Route::get('/admin/me', function (Request $request) {
        return $request->user();
    });

    // Dashboard Stats
    Route::get('/admin/stats', [DashboardController::class, 'stats']);

    // Admin CRUD Management
    Route::apiResource('services', ServiceController::class)->except(['index', 'show']);
    Route::apiResource('projects', ProjectController::class)->except(['index', 'show']);
    Route::apiResource('members', TeamMemberController::class)->except(['index', 'show']);
    Route::apiResource('testimonials', TestimonialController::class)->except(['index', 'show']);

    // Admin Contact Messages Management
    Route::get('/contact-messages', [ContactMessageController::class, 'index']);
    Route::delete('/contact-messages/{id}', [ContactMessageController::class, 'destroy']);
    Route::get('/contacts', [ContactMessageController::class, 'index']);
    Route::delete('/contacts/{id}', [ContactMessageController::class, 'destroy']);
});