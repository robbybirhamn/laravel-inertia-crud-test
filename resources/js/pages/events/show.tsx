import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, CalendarIcon, MapPinIcon, PencilIcon, ClockIcon, UserIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { index } from '@/routes/events';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Events',
        href: '/events',
    },
    {
        title: 'Event Details',
        href: '#',
    },
];

interface User {
    id: number;
    name: string;
    email: string;
}

interface Venue {
    id: number;
    name: string;
    city: string;
    state: string;
}

interface Event {
    id: number;
    title: string;
    venue: Venue;
    user: User;
    start_datetime: string;
    end_datetime: string;
    created_at: string;
    updated_at: string;
}

interface EventShowProps {
    event: Event;
}

export default function EventShow({ event }: EventShowProps) {
    const formatDateTime = (dateTime: string) => {
        const date = new Date(dateTime);
        return date.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatDate = (dateTime: string) => {
        const date = new Date(dateTime);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (dateTime: string) => {
        const date = new Date(dateTime);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getDuration = () => {
        const start = new Date(event.start_datetime);
        const end = new Date(event.end_datetime);
        const diffMs = end.getTime() - start.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        
        if (diffHours > 0) {
            return `${diffHours} hour${diffHours > 1 ? 's' : ''} ${diffMinutes > 0 ? `and ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}` : ''}`;
        }
        return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${event.title} - Event Details`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href={index().url}>
                                <ArrowLeftIcon className="size-4" />
                            </Link>
                        </Button>
                        <Heading title={event.title} />
                    </div>
                    <Button variant="outline" asChild>
                        <Link href={`/events/${event.id}/edit`}>
                            <PencilIcon className="size-4 mr-2" />
                            Edit Event
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CalendarIcon className="size-5" />
                                Event Information
                            </CardTitle>
                            <CardDescription>Details about this event</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Title</p>
                                <p className="text-lg font-semibold">{event.title}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Start Date & Time</p>
                                <p className="text-base">{formatDateTime(event.start_datetime)}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">End Date & Time</p>
                                <p className="text-base">{formatDateTime(event.end_datetime)}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Duration</p>
                                <p className="text-base flex items-center gap-2">
                                    <ClockIcon className="size-4" />
                                    {getDuration()}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPinIcon className="size-5" />
                                Venue Information
                            </CardTitle>
                            <CardDescription>Where this event is taking place</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Venue Name</p>
                                <p className="text-lg font-semibold">{event.venue.name}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Location</p>
                                <p className="text-base">{event.venue.city}, {event.venue.state}</p>
                            </div>
                            <div>
                                <Button variant="outline" asChild>
                                    <Link href={`/venues/${event.venue.id}`}>
                                        View Venue Details
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <UserIcon className="size-5" />
                                Organizer Information
                            </CardTitle>
                            <CardDescription>Event organizer details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Organizer</p>
                                <p className="text-base">{event.user.name}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Email</p>
                                <p className="text-base">{event.user.email}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Additional Information</CardTitle>
                            <CardDescription>Event metadata</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Created At</p>
                                <p className="text-base">{formatDate(event.created_at)}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                                <p className="text-base">{formatDate(event.updated_at)}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

