<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Animation extends Model
{
    use SoftDeletes;

    protected $guarded = [
        'id',
    ];

    /**
     * @return HasMany<Episode, $this>
     */
    public function episodes(): HasMany
    {
        return $this->hasMany(Episode::class);
    }

    /**
     * @return HasMany<Recommendation, $this>
     */
    public function recommendations(): HasMany
    {
        return $this->hasMany(Recommendation::class);
    }

    /**
     *@return BelongsToMany<User, $this>
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_animations', 'animation_id', 'user_id')->withTimestamps();
    }

    /**
     * @param Builder<Animation> $query
     * @param string|null $media
     * @return Builder<Animation>
     */
    public function scopeFilteredByMedia(Builder $query, ?string $media): Builder
    {
        return $query->when($media, function ($q) use ($media) {
            $q->where('media', $media);
        });
    }
}
