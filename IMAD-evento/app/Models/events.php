<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class events extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'categories',
        'description',
        'date',
        'photo',
        'places',
        'city',
        'organizer',
        'manual_review',
        'price',
        'organizerid',
        'placestoked',
        'validated',
    ];
    protected $casts = [
        'manual_review' => 'boolean',
    ];
}
