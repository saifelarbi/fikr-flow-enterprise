<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    const CATEGORY_SALARY = 'Salary';
    const CATEGORY_UTILITIES = 'Utilities';
    const CATEGORY_SUPPLIES = 'Supplies';
    const CATEGORY_TRANSPORTATION = 'Transportation';
    const CATEGORY_MARKETING = 'Marketing';
    const CATEGORY_OTHER = 'Other';

    protected $fillable = ['user_id', 'category', 'amount', 'description', 'date'];

    protected $casts = [
        'amount' => 'decimal:2',
        'date' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
