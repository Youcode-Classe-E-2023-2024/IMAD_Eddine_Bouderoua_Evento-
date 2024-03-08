<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\events;
use App\Models\reservations;
class GetAllEvents extends Controller
{
    public function index(){
        $Events = events::All();
        return response()->json(['Events' => $Events]);
    }

    public function getrev(Request $request)
    {
        try {
            $token = $request->header('token');
            $hePos = strpos($token, "he");
            $andPos = strpos($token, "And");

            $id = substr($token, 0, $hePos);

            $reservations = reservations::where('userid', $id)->get();

            $result = [];

            foreach ($reservations as $reservation) {

                $eventId = $reservation->eventid;
                $event = events::find($eventId);

                if ($event) {
                    $result[] = [
                        'name' => $event->title,
                        'place' => $event->city,
                        'date' => $event->date,
                        'places' => $event->places,
                        'validated' => $reservation->validated,
                    ];
                }
            }

            return response()->json(['events' => $result]);
        } catch (\Exception $e) {
            // Log the exception
            \Log::error($e);

            // Return a meaningful error response
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

}
