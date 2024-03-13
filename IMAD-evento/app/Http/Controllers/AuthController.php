<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use function Laravel\Prompts\password;
use Hash;

class AuthController extends Controller
{
    public function register() {
        return view('auth.register');
    }


    public function login() {
        return view('auth.login');
    }


    public function store(Request $request)
    {
        $validated = [
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => $request->input('password'),
            
        ];
      

        $validated['password'] = Hash::make($validated['password']);

   
        $user = User::create($validated);
        // $user->assignRole('member');

        return response()->json(['message' => 'Registration successful']);
    }

    public function authenticate(Request $request) {
        $credentials = [
            'email' => $request->input('email'),
            'password' => $request->input('password'),
            
        ];
   
        // Check if the user exists
        $user = User::where('email', $credentials['email'])->first();
    
        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            // User not found or password incorrect
            return response()->json(['error' => 'Invalid credentials'], 401);
        }
    
       
        $hashedCredentials = $user->id . 'he' .  md5($credentials['email']) . 'And' . $user->password;
    
      
        return response()->json([
            'hashed_credentials' => $hashedCredentials,
        ]);
    }

    public function logout() {
        auth()->logout();
        return redirect()->route('main');
    }

    public function destroy() {
        auth()->user()->delete();
        return redirect()->route('main');
    }
}
