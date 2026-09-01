<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        return response()->json(Project::orderBy('id', 'desc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'construction_type' => 'nullable|string|max:255',
            'sector' => 'nullable|string|max:255',
            'short_desc' => 'nullable|string',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:4096',
        ]);

        $projectData = $validated;
        $projectData['full_description'] = $request->input('description', '');

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('projects', 'public');
            $projectData['image'] = '/storage/' . $path;
        }

        $project = Project::create($projectData);

        return response()->json(['success' => true, 'data' => $project], 201);
    }

    public function show($id)
    {
        return response()->json(Project::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'construction_type' => 'nullable|string|max:255',
            'sector' => 'nullable|string|max:255',
            'short_desc' => 'nullable|string',
            'description' => 'nullable|string',
            'image' => 'nullable',
        ]);

        $projectData = $validated;
        $projectData['full_description'] = $request->input('description', '');

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('projects', 'public');
            $projectData['image'] = '/storage/' . $path;
        } else {
            unset($projectData['image']);
        }

        $project->update($projectData);

        return response()->json(['success' => true, 'data' => $project]);
    }

    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();

        return response()->json(['success' => true, 'message' => 'Project deleted successfully']);
    }
}