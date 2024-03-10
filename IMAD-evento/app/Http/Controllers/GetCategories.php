<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class GetCategories extends Controller
{
    public function index(Request $request)
    {
        $term = $request->header('term');

        $categories = Category::where('name', 'like', "%$term%")->get();

        return response()->json(['categories' => $categories]);
    }
}
