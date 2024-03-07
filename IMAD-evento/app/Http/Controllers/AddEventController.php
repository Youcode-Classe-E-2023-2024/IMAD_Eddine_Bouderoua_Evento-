<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\events;

class AddEventController extends Controller
{
    public function reserve(Request $request){
        echo "ho";
        return;
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
        
        // Validate and store the photo
        $photoPath = $photo->store('images', 'public');

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
