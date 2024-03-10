<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class eventstatus extends Model
{
    use HasFactory;
    protected $table = 'eventstatus';

    protected $fillable = [
        'eventid',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
    ];

}
