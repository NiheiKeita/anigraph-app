<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Term;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index(): Response
    {
        $users = User::get();
        return Inertia::render('Web/User/ListView', [
            'users' => $users,
        ]);
    }

    public function show(int $id): Response
    {
        $user = User::find($id);
        return Inertia::render('Web/User/ShowView', [
            'user' => $user,
        ]);
    }

    public function termIndex(int $id): Response
    {
        $terms = Term::orderBy('year', 'desc')->get();
        $user = User::find($id);

        return Inertia::render('Web/User/Term/ListView', [
            'user' => $user,
            'terms' => $terms,
        ]);
    }

    // このシーズンの見たことがあるアニメ一覧画面
    public function termShow(Request $request): Response
    {
        $term = Term::where("id", $request->term_id)->first();
        $user = User::find($request->user_id);
        $notViewAnimations = [];

        $userId = $request->user_id;
        $animations = $term->animations()
            ->join('user_animations', 'animations.id', '=', 'user_animations.animation_id')
            ->where('user_animations.viewing_status', 1) // 中間テーブルの viewing_status が null
            ->where('user_animations.user_id', $userId)
            ->get();

        return Inertia::render('Web/User/Term/ShowView', [
            'user' => $user,
            'term' => $term,
            'animations' => $animations,
            'notViewAnimations' => $notViewAnimations,
        ]);
    }

    public function listEditViewingStatusView(Request $request): Response
    {
        $terms = Term::orderBy('year', 'desc')->get();
        $user = User::find($request->user_id);

        return Inertia::render('Web/User/Term/ListEditViewingStatusView', [
            'user' => $user,
            'terms' => $terms,
        ]);
    }

    public function termEditViewingStatus(Request $request): Response
    {
        $user = Auth::guard('web')->user();
        $userId = $user->id;
        $term = Term::where("id", $request->term_id)->first();
        $animations = $term->animations;
        $notViewAnimations = [];
        if ($userId == $request->user_id) {
            $animations = $term->animations()->whereDoesntHave('users', function ($query) use ($userId) {
                $query->where('users.id', $userId); // 特定の userId と紐づいていない
            })->get();

            $notViewAnimations = $term->animations()
                ->join('user_animations', 'animations.id', '=', 'user_animations.animation_id')
                ->whereNull('user_animations.viewing_status') // 中間テーブルの viewing_status が null
                ->where('user_animations.user_id', $userId)
                ->get();
        }

        return Inertia::render('Web/User/Term/EditViewingStatusView', [
            'user' => $user,
            'term' => $term,
            'animations' => $animations,
            'notViewAnimations' => $notViewAnimations,
        ]);
    }
}
