<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MainController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ForgetPasswordController;
use App\Http\Controllers\OrganizerSubController;
use App\Http\Controllers\Admin;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [Admin::class,"index"]);
Route::get('/community', [Admin::class,"community"]);
Route::delete('/deleteuser/{id}', [Admin::class, 'deleteUser'])->name('delete.user');
Route::post('/update-role/{user}', [Admin::class, 'updateRole'])->name('update.role');
Route::post('/acceptevent/{event}', [Admin::class, 'acceptEvent'])->name('acceptevent');
Route::post('/addcategorie/{cat}', [Admin::class, 'addcategorie'])->name('categorie.add');
Route::get('/login', [AuthController::class, 'login'])->name('login')->middleware('guest');
Route::get('/register',function (){return view('auth.register');})->name('login')->middleware('guest');



Route::post('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');

/* forget-password route */
Route::get('/forget-password', [ForgetPasswordController::class, 'forgetPassword'])->name('forget.password');

Route::post('/forget-password', [ForgetPasswordController::class, 'forgetPasswordPost'])->name('forget.password.post');

Route::get('/reset-password/{token}', [ForgetPasswordController::class, 'resetPassword'])->name('reset.password');

Route::post('/reset-password', [ForgetPasswordController::class, 'resetPasswordPost'])->name('reset.password.post');

