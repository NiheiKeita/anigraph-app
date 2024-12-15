<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Term;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Inertia\Response;

class TermController extends Controller
{
    public function index(): Response
    {
        $terms = Term::orderBy('year', 'desc')->get();
        return Inertia::render('Web/Term/ListView', [
            'terms' => $terms,
        ]);
    }

    public function show(Request $request): Response
    {
        $term = Term::where("id", $request->term_id)->first();
        $animations = $term->animations;
        $notViewAnimations = [];

        return Inertia::render('Web/Term/ShowView', [
            'term' => $term,
            'animations' => $animations,
            'notViewAnimations' => $notViewAnimations,
        ]);
    }
}
