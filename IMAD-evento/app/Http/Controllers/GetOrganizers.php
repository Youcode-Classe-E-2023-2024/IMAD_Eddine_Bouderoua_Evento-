<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\events;
use App\Models\reservations;

class GetOrganizers extends Controller
{
    public function index(){
        $Organ = User::whereNotNull('photo')->get();
        return response()->json(['Organizers' => $Organ]);
    }
    public function getorgevents(Request $request)
    {
        try {
            $token = $request->header('token');
            $hePos = strpos($token, "he");
            $andPos = strpos($token, "And");

            $id = substr($token, 0, $hePos);

            $events = events::where('id', 1)->get();


            return response()->json(['events' => $events]);
        } catch (\Exception $e) {

            \Log::error($e);

            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
    public function requests(Request $request){
        try {
            $token = $request->header('token');
            $hePos = strpos($token, "he");
            $andPos = strpos($token, "And");

            $id = substr($token, 0, $hePos);

            $reservations = reservations::where('id', 1 && 'validated' == 'no')->get();


            return response()->json(['reservations' => $reservations]);
        } catch (\Exception $e) {

            \Log::error($e);

            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
}
