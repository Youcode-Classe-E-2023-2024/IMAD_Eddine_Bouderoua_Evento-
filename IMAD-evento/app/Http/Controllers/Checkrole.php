<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;

class Checkrole extends Controller
{
    public function index(Request $request){
        $token = $request->header('token');
        $hePos = strpos($token, "he");
        $andPos = strpos($token, "And");

       
        $id = substr($token, 0, $hePos);
        $email = substr($token, $hePos + 2, $andPos - ($hePos + 2));
        $password = substr($token, $andPos + 3);

        
        $user = User::find($id);

        if ($user) {
            
            if (md5($user->email) === $email && $user->password === $password) {
           
                if ($user->organizer == 1.00) {
                    return response()->json(['role' => 'organizer']);
                } elseif ($user->organizer == 0.00) {
                    return response()->json(['role' => 'user']);
                }
                
            } else {
                return response()->json(['error' => 'Invalid credentials'], 401);
            }
        } else {
            return response()->json(['error' => 'User not found'], 404);
        }
        return ;
    }
    }

