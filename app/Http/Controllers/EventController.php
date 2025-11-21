<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Models\Event;
use App\Models\Venue;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(Request $request){
        $events = Event::with('venue')
        ->when($request->filled('venueId'), function ($query) use ($request) {
            $query->where('venue_id', $request->venueId);
        })
        ->when($request->filled('search'), function ($query) use ($request) {
            $query->where('title', 'like', '%' . $request->search . '%');
        })
        ->when($request->filled('startDate'), function ($query) use ($request) {
            $query->where('start_datetime', '>=', $request->startDate);
        })
        ->when($request->filled('endDate'), function ($query) use ($request) {
            $query->where('end_datetime', '<=', $request->endDate);
        })
        ->when($request->filled('capacity'), function ($query) use ($request) {
            $query->where('capacity', '>=', $request->capacity);
        })
        ->when($request->filled('accessibility'), function ($query) use ($request) {
            $query->where('accessibility', $request->accessibility);
        })
        ->when($request->filled('tags'), function ($query) use ($request) {
            $query->where('tags', 'like', '%' . $request->tags . '%');
        })
        ->paginate(10);
        return Inertia::render('events/index', [
            'events' => $events,
            'createEventUrl' => route('events.create'),
        ]);
    }

    public function create()
    {
        return Inertia::render('events/create');
    }

    public function store(StoreEventRequest $request)
    {
        $validated = $request->validated();

        $event = Event::create([
            'user_id' => Auth::id(),
            'title' => $validated['title'],
            'venue_id' => $validated['venue_id'],
            'start_datetime' => $validated['start_datetime'],
            'end_datetime' => $validated['end_datetime'],
        ]);

        return back()->with('success', 'Event created successfully.');
    }

    public function edit(Event $event)
    {
        return Inertia::render('events/edit', [
            'event' => $event->with('venue')->first(),
        ]);
    }

    public function update(UpdateEventRequest $request, Event $event)
    {
        $validated = $request->validated();

        $event->update([
            'title' => $validated['title'],
            'venue_id' => $validated['venue_id'],
            'start_datetime' => $validated['start_datetime'],
            'end_datetime' => $validated['end_datetime'],
        ]);

        return back()->with('success', 'Event updated successfully.');
    }

    public function destroy(Event $event)
    {
        $event->delete();
        return back()->with('success', 'Event deleted successfully.');
    }
}
