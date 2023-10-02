<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\GradeController;
use App\Http\Controllers\ClassesController;
use App\Http\Controllers\RegisterController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // GRADE CONTROLLER
    Route::resource('grades', GradeController::class)->names([
        'index' => 'grades.index',
        'create' => 'grades.create',
        'store' => 'grades.store',
        'show' => 'grades.show',
        'edit' => 'grades.edit',
        'update' => 'grades.update',
        'destroy' => 'grades.destroy',
    ]);
    // CLASSES CONTROLLER 
    Route::resource('classes', ClassesController::class)->names([
        'index' => 'classes.index',
        'create' => 'classes.create',
        'store' => 'classes.store',
        'show' => 'classes.show',
        'edit' => 'classes.edit',
        'update' => 'classes.update',
        'destroy' => 'classes.destroy',
    ]);
    // REGISTER CONTROLLER
    Route::resource('registers', RegisterController::class)->names([
        'index' => 'registers.index',
        'create' => 'registers.create',
        'store' => 'registers.store',
        'show' => 'registers.show',
        'edit' => 'registers.edit',
        'update' => 'registers.update',
        'destroy' => 'registers.destroy',
    ]);
});

require __DIR__.'/auth.php';
