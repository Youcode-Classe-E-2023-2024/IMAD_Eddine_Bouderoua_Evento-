<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
class Updatetoorganizer extends Controller
{
    public function index(Request $request)
    {
        $photo = $request->file('photo');
        $user = new User;
       
        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            
            // Validate and store the photo
            $photoPath = $photo->store('images', 'public');
    
            // Check if the user exists
            if ($user) {
                // Update the organizer column to true
                $user->update(['organizer' => true]);
                User::where('id', 1)->update(['photo' => str_replace("images/", "", $photoPath)]);
                
                return response()->json(['message' => $user]);
            } else {
                return response()->json(['error' => 'User not found'], 404);
            }
        } else {
            return response()->json(['error' => 'Photo not provided'], 400);
        }
    }
}
