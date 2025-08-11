<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\ShowTermRequest;
use App\Models\Term;
use Inertia\Inertia;
use Inertia\Response;

class TermController extends Controller
{
    public function index(): Response
    {
        $terms = Term::orderBy('year', 'desc')->orderByRaw("FIELD(season, 'winter', 'spring', 'summer', 'autumn')")->get();
        return Inertia::render('Web/Term/ListView', [
            'terms' => $terms,
        ]);
    }

    public function show(ShowTermRequest $request): Response
    {
        $term = $request->term();
        $animations = $term->animations()->filteredByMedia($request->media)->get();

        return Inertia::render('Web/Term/ShowView', [
            'term' => $term,
            'animations' => $animations,
            'notViewAnimations' => [], // TODO:必要になったらロジック追加
        ]);
    }
}
