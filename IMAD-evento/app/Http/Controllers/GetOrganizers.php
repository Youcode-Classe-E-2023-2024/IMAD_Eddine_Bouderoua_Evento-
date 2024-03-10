<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\events;
use App\Models\reservations;
use Illuminate\Support\Facades\DB;


class GetOrganizers extends Controller
{
    public function index(){
        $Organ = User::limit(5)->whereNotNull('photo')->get();
        return response()->json(['Organizers' => $Organ]);
    }
    public function getorgevents(Request $request)
    {
        try {
            $token = $request->header('token');
            $hePos = strpos($token, "he");
            $andPos = strpos($token, "And");

            $organizerid = substr($token, 0, $hePos);

            $events = events::where('organizerid', $organizerid)->get();


            return response()->json(['events' => $events]);
        } catch (\Exception $e) {

            \Log::error($e);

            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }



    public function requests(Request $request)
    {
        try {
            $token = $request->header('token');
            $hePos = strpos($token, "he");
            $andPos = strpos($token, "And");

            $organizerid = substr($token, 0, $hePos);

            $events = events::where('organizerid',  $organizerid)
            ->where('manual_review', true)
                ->get();

                $reservations = [];
                foreach ($events as $event) {
                    $pendingReservations = reservations::where("eventid", $event->id)
                        ->where('validated', 'no')
                        ->get();
                
                    foreach ($pendingReservations as $reservation) {
                        $user = User::find($reservation->userid);
                
                        if ($user) {
                            $reservations[] = [
                                'name' => $event->title,
                                'user' => $user->email,
                                'date' => $event->date,
                                'id' => $event->id,
                                'userid' => $user->id,
                            ];
                        }
                    }
                }
                

            return response()->json(['reservations' => $reservations]);
        } catch (\Exception $e) {
            \Log::error($e);
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    
}
        public function updatereserve(Request $request){
            try {
                $requestData = $request->json()->all();

                $mode = $requestData['mode'];
                $eventid = $requestData['eventid'];
                $userid = $requestData['userid'];
        
                if ($mode == 0) {
                    echo $eventid . $userid;
                    reservations::where('eventid', $eventid)
                        ->where('userid', $userid)
                        ->delete();
        
                    return response()->json(['message' => 'Reservation declined successfully']);
                } elseif ($mode == 1) {
                    reservations::where('eventid', $eventid)
                        ->where('userid', $userid)
                        ->update(['validated' => 'ok']);
                    events::where('id', $eventid)
                        ->update(['manual_review' => 0]);
        
                    return response()->json(['message' => 'Reservation accepted successfully']);
                } else {
                    return response()->json(['error' => 'Invalid mode'], 400);
                }
            } catch (\Exception $e) {
                \Log::error($e);
                return response()->json(['error' => 'Internal Server Error'], 500);
            }
        }
    

}
