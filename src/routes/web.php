<?php

use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\Admin\AdminLoginController;
// use App\Http\Controllers\Admin\AdminDashboardController;
// use App\Http\Controllers\Admin\AdminUserController;
// use App\Http\Controllers\Admin\ImageController;
// use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Web\TopController;
use App\Http\Controllers\Web\LoginController;
use App\Http\Controllers\Web\PasswordController;
use App\Http\Controllers\Web\UserController;

// use App\Http\Middleware\VerifyCsrfToken;

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

Route::group(['middleware' => 'basicauth'], function () {
    Route::fallback(function () {
        return redirect(route('web.top'));
    });

    Route::get('/', [TopController::class, 'index'])->name('web.top');
    Route::get('/', [UserController::class, 'index'])->name('web.user.index');



    Route::middleware('guest.web')->group(function () {
        Route::get('password/edit/{token}', [PasswordController::class, 'edit'])->name('web.password.edit');
        Route::post('password/edit/{token}', [PasswordController::class, 'update'])->name('web.password.update');
    });
    Route::get('login', [LoginController::class, 'create'])->name('user.login');
    Route::post('login', [LoginController::class, 'store']);
});
