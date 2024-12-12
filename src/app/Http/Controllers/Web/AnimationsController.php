<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Term;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AnimationsController extends Controller
{
    public function showTerm(string $id): Response
    {
        $user = Auth::guard('web')->user();
        $term = Term::find($id);
        // dd($term->animations);

        // dd($terms[0]);
        return Inertia::render('Web/ShowTermAnimationsView', [
            'user' => $user,
            'term' => $term,
            'animations' => $term->animations,
        ]);
    }
    public function editUser(Request $request)
    {
        $user = User::find($request->user_id);
        $user->animations()->create(
            [
                'animation_id' => $request->animation_id
            ],
            [
                'viewing_status' => $request->viewingStatus
            ]
        );
        // $user->animations()->updateExistingPivot($request->animation_id, ['viewing_status' => $request->viewingStatus]);
        return response()->json($user->name);
        // dd($terms[0]);
        // return Inertia::render('Web/ShowTermAnimationsView', [
        //     'user' => $user,
        //     'term' => $term,
        //     'animations' => $term->animations,
        // ]);
    }
}
