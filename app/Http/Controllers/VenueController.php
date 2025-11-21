<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVenueRequest;
use App\Http\Requests\UpdateVenueRequest;
use App\Models\Venue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VenueController extends Controller
{
    public function index(){
        $venues = Venue::paginate(10);
        return Inertia::render('venues/index', [
            'venues' => $venues,
            'createVenueUrl' => route('venues.create'),
        ]);
    }

    public function create()
    {
        return Inertia::render('venues/create');
    }

    public function store(StoreVenueRequest $request)
    {
        $validated = $request->validated();

        Venue::create([
            'name' => $validated['name'],
            'city' => $validated['city'],
            'state' => $validated['state'],
            'capacity' => $validated['capacity'],
            'accessibility' => $validated['accessibility'],
            'tags' => $validated['tags'],
            'layout' => $validated['layout'],
            'avg_ratings' => $validated['avg_ratings'],
            'latitude' => $validated['latitude'],
            'longitude' => $validated['longitude'],
        ]);

        return back()->with('success', 'Venue created successfully.');
    }

    public function edit(Venue $venue)
    {
        return Inertia::render('venues/edit', [
            'venue' => $venue,
        ]);
    }

    public function update(UpdateVenueRequest $request, Venue $venue)
    {
        $validated = $request->validated();

        $venue->update([
            'name' => $validated['name'],
            'city' => $validated['city'],
            'state' => $validated['state'],
            'capacity' => $validated['capacity'],
            'accessibility' => $validated['accessibility'],
            'tags' => $validated['tags'],
            'layout' => $validated['layout'],
            'avg_ratings' => $validated['avg_ratings'],
            'latitude' => $validated['latitude'],
            'longitude' => $validated['longitude'],
        ]);

        return back()->with('success', 'Venue updated successfully.');
    }

    public function destroy(Venue $venue)
    {
        $venue->delete();
        return back()->with('success', 'Venue deleted successfully.');
    }

    public function search(Request $request)
    {
        $query = $request->input('q', '');
        $limit = $request->input('limit', 20);

        $venues = Venue::query()
            ->when($query, function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                  ->orWhere('city', 'like', "%{$query}%")
                  ->orWhere('state', 'like', "%{$query}%");
            })
            ->limit($limit)
            ->get(['id', 'name', 'city', 'state']);

        return response()->json($venues);
    }
}
