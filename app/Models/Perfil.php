<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Perfil extends Model
{
    use HasFactory;
    protected $fillable = ['nombre'];
    public function users()
    {
        return $this->hasMany(User::class);
    }

}
