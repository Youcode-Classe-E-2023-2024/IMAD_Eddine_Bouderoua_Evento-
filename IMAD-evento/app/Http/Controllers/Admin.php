<?php

namespace App\Http\Controllers;
use App\Models\events;
use Illuminate\Http\Request;
use App\Models\comments;
use App\Models\User;
use App\Models\Category;
use App\Models\requestedcategories;
use App\Models\eventstatus;
class Admin extends Controller
{
    public function index(){
        $users = User::all();
        $events = events::where('validated', 'no')->get();
        $status = eventstatus::selectRaw('
    SUM(monday) as monday_total,
    SUM(tuesday) as tuesday_total,
    SUM(wednesday) as wednesday_total,
    SUM(thursday) as thursday_total,
    SUM(friday) as friday_total,
    SUM(saturday) as saturday_total,
    SUM(sunday) as sunday_total
')->groupBy('eventid')->get();

foreach ($status as $dayTotals) {
    $mondayTotal = $dayTotals->monday_total;
    $tuesdayTotal = $dayTotals->tuesday_total;
    $wednesdayTotal = $dayTotals->wednesday_total;
    $thursdayTotal = $dayTotals->thursday_total;
    $fridayTotal = $dayTotals->friday_total;
    $saturdayTotal = $dayTotals->saturday_total;
    $sundayTotal = $dayTotals->sunday_total;

    $dayTotalsArray = [
        'monday' => $mondayTotal,
        'tuesday' => $tuesdayTotal,
        'wednesday' => $wednesdayTotal,
        'thursday' => $thursdayTotal,
        'friday' => $fridayTotal,
        'saturday' => $saturdayTotal,
        'sunday' => $sundayTotal,
    ];

}

        return view('html.index', compact('users','events','dayTotalsArray'));
    }
    public function community(){
        $requestedcategories = requestedcategories::all();
        $chats = comments::all();
        return view('html.community', compact('requestedcategories','chats'));// 
    }
    public function addcategorie(requestedcategories $cat){
        Category::create(['name'=>$cat->name]);
        $cat->delete();
        return redirect()->back()->with('success', 'Role updated successfully.');
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
