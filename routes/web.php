<?php

use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\Protect;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// If the user vivists '/' route, it will automatically redirect to /dashboard
Route::redirect('/', '/product');

// Dashboard access is only granted if the user is authenticated (middleware)
Route::middleware(['auth'])->group(function() {
    // Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');

    Route::resource('product', ProductController::class);
    Route::resource('invoice', InvoiceController::class);
    Route::resource('user', UserController::class);
});


// Route::redirect('/')




Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
