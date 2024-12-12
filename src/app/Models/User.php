<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'tel',
        'password_token',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    protected static function boot()
    {
        parent::boot();

        static::updated(function ($user) {
            // プランが変更されたかどうかを確認する
            if ($user->isDirty('plan_id')) {
                // プランが変更された場合、ログを保存する
                DB::table('user_plan_logs')->insert([
                    'user_id' => $user->id,
                    'plan_id' => $user->plan_id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        });
    }

    /**
     *@return BelongsToMany<Animation>
     */
    public function animations(): BelongsToMany
    {
        return $this->belongsToMany(Animation::class, 'user_animations', 'user_id', 'animation_id')->withTimestamps();
    }

    /**
     *@return BelongsToMany<Episode>
     */
    public function episodes(): BelongsToMany
    {
        return $this->belongsToMany(Episode::class, 'user_episodes', 'user_id', 'episode_id')->withTimestamps();
    }

    /**
     * @return HasMany<TermRanking>
     */
    public function termRankings(): HasMany
    {
        return $this->hasMany(TermRanking::class);
    }

    /**
     * @return HasMany<Recommendation>
     */
    public function recommendations(): HasMany
    {
        return $this->hasMany(Recommendation::class);
    }
}
