<?php

namespace App\Enums;

enum OrderStatus: string
{
    case InProgress = 'in_progress';
    case Accepted = 'accepted';
    case Completed = 'completed';
    case Cancelled = 'cancelled';
}
