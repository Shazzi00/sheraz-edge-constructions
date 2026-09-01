<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    public function index()
    {
        return response()->json(Service::orderBy('id', 'desc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:services,slug',
            'short_desc' => 'nullable|string',
            'content' => 'nullable|string',
            'status' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:4096',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        // Handle File Upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('services', 'public');
            $validated['image'] = '/storage/' . $path;
        } else {
            $validated['image'] = '/civil.jpg';
        }

        $service = Service::create($validated);

        return response()->json(['success' => true, 'data' => $service], 201);
    }

    public function show($id)
    {
        return response()->json(Service::findOrFail($id));
    }

  public function update(Request $request, $id)
{
    $service = Service::findOrFail($id);

    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'slug' => 'required|string|unique:services,slug,' . $id,
        'short_desc' => 'nullable|string',
        'content' => 'nullable|string',
        'status' => 'required|string',
        'image' => 'nullable',
    ]);

    if ($request->hasFile('image')) {
        $path = $request->file('image')->store('services', 'public');
        $validated['image'] = '/storage/' . $path;
    } else {
        // Keep existing image in database if no new file selected
        unset($validated['image']);
    }

    $service->update($validated);

    return response()->json(['success' => true, 'data' => $service]);
}

    public function destroy($id)
    {
        $service = Service::findOrFail($id);
        $service->delete();

        return response()->json(['success' => true, 'message' => 'Service deleted successfully']);
    }
}