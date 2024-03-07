<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class GetOrganizers extends Controller
{
    public function index(){
        $Organ = User::whereNotNull('photo')->get();
        return response()->json(['Organizers' => $Organ]);
    }
}
