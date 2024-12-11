<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Episode extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $guarded = [
        'id',
    ];

    /**
     *@return BelongsToMany<User, $this>
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_episodes', 'episode_id', 'user_id')->withTimestamps();
    }
    /**
     *@return BelongsToMany<WeekRanking, $this>
     */
    public function weekRankings(): BelongsToMany
    {
        return $this->belongsToMany(WeekRanking::class, 'episode_week_rankings', 'episode_id', 'week_ranking_id')->withTimestamps();
    }
    /**
     *@return BelongsTo<Animation, $this>
     */
    public function animation(): BelongsTo
    {
        return $this->belongsTo(Animation::class);
    }
}
