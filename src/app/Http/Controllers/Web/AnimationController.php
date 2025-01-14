<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AnimationController extends Controller
{
    public function updateUserViewingStatus(Request $request): JsonResponse
    {
        try {
            $user = User::where("id", $request->user_id)->first();
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

    public function updateUserEvaluation(Request $request): JsonResponse
    {
        try {
            $user = User::where("id", $request->user_id)->first();
            $existingRecord = $user->animations()->where('animation_id', $request->animation_id)->first();

            if ($existingRecord) {
                // レコードが存在する場合は更新
                $user->animations()->updateExistingPivot($request->animation_id, [
                    'viewing_status' => $request->viewing_status,
                    'evaluation' => $request->evaluation,
                ]);
            } else {
                // レコードが存在しない場合は新規挿入
                $user->animations()->attach($request->animation_id, [
                    'viewing_status' => $request->viewing_status,
                    'evaluation' => $request->evaluation,
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
