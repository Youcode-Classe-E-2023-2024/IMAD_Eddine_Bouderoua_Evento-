<?php

namespace App\Http\Controllers;
use App\Models\events;
use Illuminate\Http\Request;
use App\Models\User;
class Admin extends Controller
{
    public function index(){
        $users = User::all();
        $events = events::where('validated', 'no')->get();
        return view('html.index', compact('users','events'));
    }
    public function deleteUser($id)
    {
        $user = User::find($id);

        if (!$user) {
            return redirect()->route('users.index')->with('error', 'User not found');
        }

        $user->delete();

        return redirect()->route('users.index')->with('success', 'User deleted successfully');
    }
    public function updateRole(Request $request, User $user)
    {
    if($user->organizer == 1.00){

        $user->update(['organizer' => false]);
    }else{
        $user->update(['organizer' => true]);
    }

    return redirect()->back()->with('success', 'Role updated successfully.');
    }
    public function acceptEvent(Request $request, events $event)
        {
            try {

                $event = events::find($event->id);
        
                if (!$event) {
                    dd('la');
                    return redirect()->back()->with('error', 'Event not found.');
                }

                $event->update(['validated' => 'ok']);
        
                return redirect()->back()->with('success', 'Event accepted successfully.');
            } catch (\Exception $e) {
                return redirect()->back()->with('error', 'Error accepting event.');
            }
       
        }
}
