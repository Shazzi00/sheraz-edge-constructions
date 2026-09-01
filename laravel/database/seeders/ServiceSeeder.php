<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'title' => 'Specialty Construction',
                'slug' => 'specialty-construction',
                'short_desc' => 'Custom architectural solutions tailored for specialized engineering.',
                'content' => 'Specialty construction is a niche sector within the construction industry focusing on complex engineering works.',
                'status' => 'Active',
                'image' => '/civil.jpg',
            ],
            [
                'title' => 'Civil Construction',
                'slug' => 'civil-construction',
                'short_desc' => 'Public infrastructure, road networks, and bridge development.',
                'content' => 'Civil construction forms the backbone of modern society infrastructure.',
                'status' => 'Active',
                'image' => '/civil.jpg',
            ],
            [
                'title' => 'Residential Construction',
                'slug' => 'residential-construction',
                'short_desc' => 'Dedicated to creating living spaces for modern families.',
                'content' => 'From multi-family luxury apartments to standalone modern villas.',
                'status' => 'Active',
                'image' => '/civil.jpg',
            ],
            [
                'title' => 'Corporate Construction',
                'slug' => 'corporate-construction',
                'short_desc' => 'State-of-the-art office complexes and commercial headquarters.',
                'content' => 'Corporate construction demands a blend of sleek modern architecture and technology.',
                'status' => 'Active',
                'image' => '/civil.jpg',
            ],
            [
                'title' => 'Building Constructions',
                'slug' => 'building-constructions',
                'short_desc' => 'Multi-story structural frameworks and modern commercial buildings.',
                'content' => 'End-to-end management of complex multi-story structures.',
                'status' => 'Active',
                'image' => '/civil.jpg',
            ],
            [
                'title' => 'Industrial Construction',
                'slug' => 'industrial-construction',
                'short_desc' => 'Robust factory layouts, processing units, and logistics warehouses.',
                'content' => 'Engineered for heavy machinery and continuous operational demand.',
                'status' => 'Active',
                'image' => '/civil.jpg',
            ],
        ];

        foreach ($services as $service) {
            Service::updateOrCreate(['slug' => $service['slug']], $service);
        }
    }
}