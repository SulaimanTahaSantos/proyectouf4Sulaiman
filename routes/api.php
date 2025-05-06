<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;

// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });

function RetornarMensaje($mensaje){
    return response()->json(['mensaje' => $mensaje]);
}
  
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::post('/users', [UserController::class, 'store']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);
Route::post('/registro', [UserController::class, 'register']);
Route::post('/inicioSesion', [UserController::class, 'inicioSesion']);
// Route::get('/login', function () {
//     return RetornarMensaje('Login successful');
// });
?>