<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Term;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        // $codeCheck = new NotionApi();
        // $codeCheck->getBuildings();
        // dd($codeCheck->getBuildings());
        return Inertia::render('Web/Top');
    }
    public function show($id): Response
    {
        $user = User::find($id);
        $terms = Term::orderBy('year', 'desc')->get();
        // dd($terms[0]);
        return Inertia::render('Web/UserShowView', [
            'user' => $user,
            'terms' => $terms,
        ]);
    }
}
