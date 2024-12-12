<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Term;
use App\Models\User;
use App\Models\Animation;
use Error;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AnimationsController extends Controller
{
    public function showTerm(string $id): Response
    {
        $user = Auth::guard('web')->user();
        $userId =  $user->id;
        $term = Term::find($id);
        $animations = $term->animations;
        $notViewAnimations = [];
        if ($user->id) {
            $animations = $term->animations()->whereDoesntHave('users', function ($query) use ($userId) {
                $query->where('users.id', $userId); // 特定の userId と紐づいていない
            })->get();

            $notViewAnimations = $term->animations()
                ->join('user_animations', 'animations.id', '=', 'user_animations.animation_id')
                ->whereNull('user_animations.viewing_status') // 中間テーブルの viewing_status が null
                ->where('user_animations.user_id', $userId)
                ->get();
        }


        return Inertia::render('Web/ShowTermAnimationsView', [
            'user' => $user,
            'term' => $term,
            'animations' => $animations,
            'notViewAnimations' => $notViewAnimations,
        ]);
    }
    public function editUser(Request $request)
    {
        try {
            $user = User::find($request->user_id);
            $existingRecord = $user->animations()->where('animation_id', $request->animation_id)->first();

            // return response()->json([
            //     'viewing_status' => $request->viewing_status
            // ], 200);

            if ($existingRecord) {
                // レコードが存在する場合は更新
                $user->animations()->updateExistingPivot($request->animation_id, [
                    'viewing_status' => $request->viewing_status,
                    'updated_at' => now(),
                ]);
            } else {
                // レコードが存在しない場合は新規挿入
                $user->animations()->attach($request->animation_id, [
                    'viewing_status' => $request->viewing_status,
                ]);
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Animation attached successfully.',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to attach animation.',
                'error' => $e->getMessage(), // デバッグ用（本番環境では外す）
            ], 500);
        }
    }
}
