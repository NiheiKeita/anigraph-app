<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Term extends Model
{
    use SoftDeletes;

    protected $guarded = [
        'id',
    ];

    /**
     *@return HasMany<Animation, $this>
     */
    public function animations(): HasMany
    {
        return $this->hasMany(Animation::class);
    }
}
