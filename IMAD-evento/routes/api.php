<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AddEventController;
use App\Http\Controllers\GetAllEvents;
use App\Http\Controllers\Updatetoorganizer;
use App\Http\Controllers\GetOrganizers;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Checkrole;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/addEvent', [AddEventController::class, 'index'])->name('addEvent');
Route::get('/GetAllEvents',[GetAllEvents::class,'index'])->name('GetEvents');

Route::get('/photo/{filename}', function ($filename) {
    // Specify the storage path for images
    $path = 'public/images/' . $filename;

    // Check if the file exists
    if (Storage::exists($path)) {
        // Return the image with appropriate headers
        return response()->file(storage_path('app/' . $path));
    } else {
        dd("mkynch");
        // Return a default image or an error message
        return response()->file(storage_path('app/public/default.jpg'));
    }
});

Route::post('/Updatetoorganizer',[Updatetoorganizer::class,'index'])->name('GetEvents');
Route::get("/Organizers",[GetOrganizers::class,'index']);
Route::post("/reserve",[AddEventController::class,'reserve']);
Route::post('/register', [AuthController::class, 'store']);
Route::post('/login', [AuthController::class, 'authenticate']);
Route::post('/Checkwho', [Checkrole::class, 'index']);
Route::get('/GetAllreservations',[GetAllEvents::class,'getrev']);
Route::post("/getorgevents",[GetOrganizers::class,'getorgevents']);
Route::post("/requests",[GetOrganizers::class,'requests']);