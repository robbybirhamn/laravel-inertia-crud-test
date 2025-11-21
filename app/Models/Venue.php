<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Venue extends Model
{
    use HasFactory;

    const ACCESSIBILITY_OPTIONS = [
        'wheelchair',
        'parking',
        'audio_assist',
        'elevator',
    ];

    const LAYOUT_OPTIONS = [
        'theater',
        'classroom',
        'banquet',
        'u_shape',
    ];

    protected $fillable = [
        'name',
        'city',
        'state',
        'capacity',
        'accessibility',
        'tags',
        'layout',
        'avg_ratings',
        'latitude',
        'longitude',
    ];

    protected $casts = [
        'accessibility' => 'array',
        'layout' => 'array',
    ];
    

    public function events()
    {
        return $this->hasMany(Event::class);
    }
}
