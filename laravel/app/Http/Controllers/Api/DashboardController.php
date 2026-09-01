<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Service;
use App\Models\TeamMember;
use App\Models\Testimonial;
use App\Models\ContactMessage;

class DashboardController extends Controller
{
    public function stats()
    {
        return response()->json([
            'projects' => Project::count(),
            'services' => Service::count(),
            'members' => TeamMember::count(),
            'testimonials' => Testimonial::count(),
            'messages' => ContactMessage::count(),
            'recent_messages' => ContactMessage::orderBy('id', 'desc')->take(3)->get(),
        ]);
    }
}