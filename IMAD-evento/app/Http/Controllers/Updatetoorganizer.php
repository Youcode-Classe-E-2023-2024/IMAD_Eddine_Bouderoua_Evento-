<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
class Updatetoorganizer extends Controller
{
    public function index(Request $request)
{
    $token = $request->header('token');
        $hePos = strpos($token, "he");
        $andPos = strpos($token, "And");

       
        $id = substr($token, 0, $hePos);
        $email = substr($token, $hePos + 2, $andPos - ($hePos + 2));
        $password = substr($token, $andPos + 3);

    $user = User::find($id);

    if (!$user) {
        return response()->json(['error' => 'User not found'], 404);
    }

    if ($request->hasFile('photo')) {
        $photo = $request->file('photo');
        $photoPath = $photo->store('images', 'public');

        $user->update(['photo' => str_replace("images/", "", $photoPath)]);
        $user->update([
            'organizer' => true,
        ]);
        

        return response()->json(['message' => $user]);
    } else {
        return response()->json(['error' => 'Photo not provided'], 400);
    }
}

}
