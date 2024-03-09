<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\events;
use App\Models\reservations;

class AddEventController extends Controller
{
  
    

    public function reserve(Request $request) {
        $requestData = $request->json()->all();

        $token = $request->header('token');
        $hePos = strpos($token, "he");
        $andPos = strpos($token, "And");

       
        $id = substr($token, 0, $hePos);

        $eventId = $requestData['id'];
    
        $event = events::find($eventId);
    
        if (!$event) {
            return response()->json(['error' => 'Event not found'], 404);
        }

        if ($event->manual_review) {
            // Manual review required
            reservations::create([
                'userid' => $id,   
                'eventid' => $eventId,
                'validated' => 'no',  
            ]);
        
            return response()->json(['message' => 'Manual review required']);
        } else {
            // Reservation successful
            reservations::create([
                'userid' => $id,  
                'eventid' => $eventId, 
                'validated' => 'ok', 
            ]);
        
            return response()->json(['message' => 'Reservation successful']);
        }
        
    }
    
    
    public function index(Request $request)
    {
        // Access data from the request
        $eventName = $request->input('event_name');
        $eventDate = $request->input('event_date');
        $places = $request->input('places');
        $city = $request->input('city');
        $categories = $request->input('categories');
        $manualReview = $request->input('manual_review');
        $description = $request->input('description');
        $photo = $request->file('photo');
        
        $photoPath = $photo->store('images', 'public');

        $token = $request->header('token');
        $hePos = strpos($token, "he");
        $andPos = strpos($token, "And");

        $organizerid = substr($token, 0, $hePos);

        $eventData = [
            'title' => $eventName,
            'categories' => $categories,
            'description' => $description,
            'date' => $eventDate,
            'photo' => str_replace("images/", "", $photoPath), 
            'places' => $places,
            'city' =>  $city,
            'organizer' => 'Sample Organizer',
            'manual_review' => filter_var($manualReview, FILTER_VALIDATE_BOOLEAN),
            'price' => $request->input('price'),
            'organizerid'=>$organizerid
        ];

     
        $event = events::create($eventData);
       
        $type = gettype($manualReview);

    echo $type;
        return response()->json([
            'message' => 'Event received successfully',
            'event_data' => [
                'event_name' => $eventName,
                'event_date' => $eventDate,
                'places' => $places,
                'city' => $city,
                'categories' => $categories,
                'manual_review' => filter_var($manualReview, FILTER_VALIDATE_BOOLEAN),
                'description' => $description,
                'photo_path' =>$photo ,
            ],
        ], 200);
    }
}
