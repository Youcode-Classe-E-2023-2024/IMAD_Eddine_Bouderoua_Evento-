<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AddEventController;
use App\Http\Controllers\GetAllEvents;


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
