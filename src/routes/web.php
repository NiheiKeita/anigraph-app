<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminLoginController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\UserController as UserAdminController;
use App\Http\Controllers\Web\AnimationsController;
use App\Http\Controllers\Web\TopController;
use App\Http\Controllers\Web\LoginController;
use App\Http\Controllers\Web\PasswordController;
use App\Http\Controllers\Web\UserController;

use App\Http\Middleware\VerifyCsrfToken;

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
    // Route::get('/', [UserController::class, 'index'])->name('web.user.index');

    Route::get('/user/{id}', [UserController::class, 'show'])->name('web.user.show');
    Route::get('/term/{id}/animations', [AnimationsController::class, 'showTerm'])->name('web.term.animations');

    Route::middleware('guest.web')->group(function () {
        Route::put('/users/{user_id}/animations/{animation_id}', [AnimationsController::class, 'editUser'])->withoutMiddleware(VerifyCsrfToken::class)->name('web.user.animation');
    });

    Route::middleware('guest.web')->group(function () {
        Route::get('password/edit/{token}', [PasswordController::class, 'edit'])->name('web.password.edit');
        Route::post('password/edit/{token}', [PasswordController::class, 'update'])->name('web.password.update');
    });
    Route::get('login', [LoginController::class, 'create'])->name('user.login');
    Route::post('login', [LoginController::class, 'store']);


    Route::get('admin/login', [AdminLoginController::class, 'index'])->name('admin.login');
    Route::post('admin/login', [AdminLoginController::class, 'store'])->name('admin.login');
    Route::middleware('guest.admin')->group(function () {
        Route::get('admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard.index');

        Route::get('admin/admin_users', [AdminUserController::class, 'index'])->name('admin_user.list');
        Route::get('admin/admin_users/add', [AdminUserController::class, 'create'])->name('admin_user.create');
        Route::post('admin/admin_users/add', [AdminUserController::class, 'store'])->name('admin_user.store');

        Route::get('admin/users', [UserAdminController::class, 'index'])->name('user.list');
        Route::get('admin/users/add', [UserAdminController::class, 'create'])->name('user.create');
        Route::post('admin/users/add', [UserAdminController::class, 'store'])->name('user.store');
        Route::get('admin/users/{id}', [UserAdminController::class, 'edit'])->name('user.edit');
        Route::post('admin/users/{id}', [UserAdminController::class, 'update'])->name('user.update');


        Route::get('admin/test', [UserAdminController::class, 'test'])->name('user.test');
    });
});
