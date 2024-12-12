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
        $existingRecord = $user->animations()->where('animation_id', $request->animation_id)->first();

        if ($existingRecord) {
            // レコードが存在する場合は更新
            $user->animations()->updateExistingPivot($request->animation_id, [
                'viewing_status' => $request->viewingStatus,
                'updated_at' => now(),
            ]);
        } else {
            // レコードが存在しない場合は新規挿入
            $user->animations()->attach($request->animation_id, [
                'viewing_status' => $request->viewingStatus,
            ]);
        }
        return response()->json($user->name);
    }
}
