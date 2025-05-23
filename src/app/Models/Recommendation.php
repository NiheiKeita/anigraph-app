<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Recommendation extends Model
{
    use SoftDeletes;

    protected $guarded = [
        'id',
    ];

    /**
     *@return BelongsTo<Animation, $this>
     */
    public function animation(): BelongsTo
    {
        return $this->belongsTo(Animation::class);
    }

    /**
     *@return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
