<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\eventstatus;
class GetStatus extends Controller
{
    public function index(Request $request){
        $idd = $request->json()->all();
        $id = $idd["id"];
        $status = eventstatus::where('eventid', $id)->first();
    
        return response()->json(['status' => $status]);
    }
    
}
