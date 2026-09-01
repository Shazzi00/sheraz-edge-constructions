<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;

class TeamMemberController extends Controller
{
    public function index()
    {
        return response()->json(TeamMember::orderBy('id', 'desc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'linkedin_url' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:4096',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('members', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        $member = TeamMember::create($validated);

        return response()->json(['success' => true, 'data' => $member], 201);
    }

    public function show($id)
    {
        return response()->json(TeamMember::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $member = TeamMember::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'linkedin_url' => 'nullable|string|max:255',
            'image' => 'nullable',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('members', 'public');
            $validated['image'] = '/storage/' . $path;
        } else {
            unset($validated['image']);
        }

        $member->update($validated);

        return response()->json(['success' => true, 'data' => $member]);
    }

    public function destroy($id)
    {
        $member = TeamMember::findOrFail($id);
        $member->delete();

        return response()->json(['success' => true, 'message' => 'Member deleted successfully']);
    }
}