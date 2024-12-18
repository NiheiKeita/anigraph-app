<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Http\Requests\UserUpdate;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/UserList', [
            'users' => User::get(),
        ]);
    }

    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/UserRegister');
    }

    public function store(UserRequest $request): RedirectResponse
    {
        User::create([
            'plan_id' => 1,
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make("pass"),
            'tel' => $request->tel,
        ]);

        return redirect(RouteServiceProvider::USERS)->with('message', '登録が完了しました');
    }

    /**
     * Display the registration view.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Admin/UserUpdate', [
            'user' => User::where("id", $request->id)->first(),
        ]);
    }

    public function update(UserUpdate $request): RedirectResponse
    {
        // $plan = Plan::where("id", $request->plan_id)->first();
        // if (!$plan) {
        //     bort(404);
        // }
        $user = User::where("id", $request->id)->first(); // 更新するユーザーのIDを取得

        $user->update([
            'plan_id' => 1,
            'name' => $request->name,
            'email' => $request->email,
            'company' => $request->company,
            'tel' => $request->tel,
        ]);

        return redirect(RouteServiceProvider::USERS)->with('message', '更新が完了しました');
    }

    // public function test(): mixed
    // {
    //     $user = Auth::guard('admin')->user();
    //     return response()->json($user->name);
    //     // return Auth::guard('admin');
    // }
}
