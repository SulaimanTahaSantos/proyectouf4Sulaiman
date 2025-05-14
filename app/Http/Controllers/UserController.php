<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index(){
        $users = User::all();
        return response()->json($users);
    }
    public function show($id){
        $user = User::find($id);
        if ($user) {
            return response()->json($user);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }
    public function store(Request $request){
        $user = new User();
        $user->name = $request->input('name');
        $user->surname = $request->input('surname');
        $user->email = $request->input('email');
        $user->password = Hash::make($request->input('password'));
        $user->dni = $request->input('dni');
        $user->rol = $request->input('rol');
        $user->save();
        return response()->json($user, 201);
    }
    public function update(Request $request, $id){
        $user = User::find($id);
        if ($user) {
            $user->name = $request->input('name');
            $user->surname = $request->input('surname');
            $user->email = $request->input('email');
            $user->password = Hash::make($request->input('password'));
            $user->dni = $request->input('dni');
            $user->rol = $request->input('rol');
            $user->save();
            return response()->json($user);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }
    public function destroy($id){
        $user = User::find($id);
        if ($user) {
            $user->delete();
            return response()->json(['message' => 'User deleted successfully']);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    public function register(Request $request){
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'surname' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:user',
                'password' => 'required|string|min:8',
                'dni' => 'required|string|max:10',
                'rol' => 'required|string|in:user,alumno,admin'
            ]);

            $user = new User();
            $user->name = $request->input('name');
            $user->surname = $request->input('surname');
            $user->email = $request->input('email');
            $user->password = Hash::make($request->input('password'));
            $user->dni = $request->input('dni');
            $user->rol = $request->input('rol');
            $user->save();

            return response()->json([
                'message' => 'Usuario registrado exitosamente',
                'user' => $user
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al registrar el usuario',
                'error' => $e->getMessage()
            ], 500);
        }
    }
public function inicioSesion(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required'
    ]);

    $user = User::where('email', $request->input('email'))->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Credenciales inválidas'], 401);
    }

    $credentials = $request->only('email', 'password');
    try{
        if(!$token = JWTAuth::attempt($credentials)){
            return response()->json(['error' => 'invalid_credentials'], 401);
        }
        return response()->json([
            'message' => 'Inicio de sesión exitoso',
            'token' => $token,
        ],200);
    }catch (JWTException $e){
        return response()->json([
            'error' => 'could_not_create_token',
            'message'=> $e->getMessage(),
        
        ], 500);
    }


    // return response()->json([
    //     'message' => 'Inicio de sesión exitoso',
    //     'user' => $user
    // ]);
}

public function getUser(){
    $user = Auth::user();
    return response()->json([
        'message' => 'Usuario autenticado',
        'data' => $user
    ], 200);
}

public function logout(){
    try {
        JWTAuth::invalidate(JWTAuth::getToken());
        return response()->json(['message' => 'Logout exitoso'], 200);
    } catch (JWTException $e) {
        return response()->json(['error' => 'No se pudo cerrar sesión'], 500);
    }
}

public function fetchUsersAndGroupsAndClasses()
{
    $users = User::with(['grupo', 'clase'])->get();
    
    // Para debug
    foreach ($users as $user) {
        \Log::info('User: ' . $user->name);
        \Log::info('Grupo: ' . ($user->grupo ? $user->grupo->nombre : 'null'));
        \Log::info('Clase: ' . ($user->clase ? $user->clase->nombre : 'null'));
    }

    return response()->json($users);
}
}