<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class requestedcategories extends Model
{
    use HasFactory;
    protected $fillable = ['name'];
}
