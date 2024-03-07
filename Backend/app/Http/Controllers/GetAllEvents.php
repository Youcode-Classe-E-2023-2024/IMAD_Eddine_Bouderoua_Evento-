<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\events;

class GetAllEvents extends Controller
{
    public function index(){
        $Events = events::All();
        return response()->json(['Events' => $Events]);
    }
}
