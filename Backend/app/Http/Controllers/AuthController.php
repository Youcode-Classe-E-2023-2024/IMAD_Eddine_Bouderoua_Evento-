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

    public function store() {
        $validated = request()->validate([
            'name' => 'required|min:5|max:50',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed'
        ]);

        $validated['password'] = Hash::make($validated['password']);

        if(request()->hasFile('image')) {
            $imagePath = request()->file('image')->store('images', 'public');
            $validated['image'] = $imagePath;
        }
        $user = User::create($validated);
//        $user->assignRole('member');

        return redirect()->route('login');
    }

    public function login() {
        return view('auth.login');
    }

    public function authenticate(User $user) {
        $validated = request()->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $remember = request()->has('remember'); // Check if "Remember Me" checkbox is checked

        if(auth()->attempt($validated, $remember)) {
            request()->session()->regenerate();
            return redirect()->route('main');
        }

        return redirect()->route('login')->withErrors([
            'email' => 'No matching user found the provided email and password'
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
