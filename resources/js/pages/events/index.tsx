import Heading from '@/components/heading';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Pagination, type PaginationLink, type PaginationMeta } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import SelectVenue from '@/components/select-venue';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Events',
        href: '/events',
    },
];

interface Venue {
    id: number;
    name: string;
}

interface Event {
    id: number;
    title: string;
    venue: Venue;
    start_datetime: string;
    end_datetime: string;
}

interface PaginatedEvents {
    data: Event[];
    links: PaginationLink[];
    meta: PaginationMeta;
}

interface EventsIndexProps {
    events: PaginatedEvents;
    createEventUrl: string;
}

export default function EventsIndex({ events, createEventUrl }: EventsIndexProps) {

    const [dialogSuccess, setDialogSuccess] = useState(false);
    const [dialogError, setDialogError] = useState(false);
    const [venueId, setVenueId] = useState<number | undefined>(undefined);
    const [search, setSearch] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [capacity, setCapacity] = useState<number | undefined>(undefined);
    const [accessibility, setAccessibility] = useState<string>('');
    const [tags, setTags] = useState<string>('');

    const applyFilter = () => {
        router.get('/events', 
        {
            venueId,
            search,
            startDate,
            endDate,
            capacity,
            accessibility,
            tags,
        },
        {
            preserveState: true,
            replace: true,
        });
    };

    const clearFilter = () => {
        setVenueId(undefined);
        setSearch('');
        setStartDate('');
        setEndDate('');
        setCapacity(undefined);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Events" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex justify-between">
                    <Heading title="Events" />
                    <Button asChild>
                        <Link href={createEventUrl}>
                            <PlusIcon className="size-4" />
                            Create Event
                        </Link>
                    </Button>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <SelectVenue value={venueId} onChange={(venueId) => setVenueId(venueId ? Number(venueId) : undefined)} placeholder='Search for a venue...'/>
                    <Input type="text" placeholder='Search for an event...' value={search} onChange={(e) => setSearch(e.target.value)} />
                    <Input  type="date" placeholder='Search for an start date...' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <Input  type="date" placeholder='Search for an end date...' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    <Input type="number" placeholder='Search for an capacity...' value={capacity} onChange={(e) => setCapacity(e.target.value ? Number(e.target.value) : undefined)} />
                    <Select value={accessibility} onValueChange={(value) => setAccessibility(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder='Select an accessibility' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="wheelchair">Wheelchair</SelectItem>
                            <SelectItem value="parking">Parking</SelectItem>
                            <SelectItem value="audio_assist">Audio Assist</SelectItem>
                            <SelectItem value="elevator">Elevator</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input type="text" placeholder='Search for a tag...' value={tags} onChange={(e) => setTags(e.target.value)} />
                </div>
                <div>
                    <Button variant="outline" onClick={clearFilter}>Clear Filter</Button>
                <Button onClick={applyFilter}>Apply Filter</Button>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="overflow-x-auto rounded-lg border border-sidebar-border/70 dark:border-sidebar-border">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-sidebar-border/70 dark:border-sidebar-border">
                                    <th className="px-4 py-3 text-left text-sm font-medium">Title</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium">Venue</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium">Start Date</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium">End Date</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.data.map((event) => (
                                    <tr
                                        key={event.id}
                                        className="border-b border-sidebar-border/70 dark:border-sidebar-border last:border-0 hover:bg-accent/50"
                                    >
                                        <td className="px-4 py-3 text-sm">
                                            <Link href={`/events/${event.id}`} className="font-medium hover:underline">
                                                {event.title}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <Link href={`/venues/${event.venue.id}`} className="hover:underline">
                                                {event.venue.name}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3 text-sm">{event.start_datetime}</td>
                                        <td className="px-4 py-3 text-sm">{event.end_datetime}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/events/${event.id}/edit`}>
                                                    <PencilIcon className="size-4" />
                                                </Link>
                                            </Button>
                                            <DeleteEvent eventId={event.id} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination links={events.links} meta={events.meta} />
                </div>
            </div>
        </AppLayout>
    );
}


function DeleteEvent({ eventId }: { eventId: number }) {
    const [showDialog, setShowDialog] = useState(false);
    return (
        <>
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" size="icon">
                    <TrashIcon className="size-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Event</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Are you sure you want to delete this event?
                </DialogDescription>
                <DialogFooter>
                    <Button variant="destructive" asChild>
                        <button type="button" onClick={() => router.post(`/events/${eventId}`,{
                                _method: 'DELETE',
                            }, {
                            onSuccess: () => {
                                alert('Event deleted successfully');
                            },
                            onError: () => {
                                alert('Event deletion failed');
                            },
                        })}>Delete</button>
                    </Button>
                    <Button variant="secondary" asChild>   
                        <DialogClose>
                        Cancel
                        </DialogClose>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        </>
    );
}