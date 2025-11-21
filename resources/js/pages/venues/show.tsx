import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, MapPinIcon, PencilIcon, UsersIcon, StarIcon, CalendarIcon, TagIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Venues',
        href: '/venues',
    },
    {
        title: 'Venue Details',
        href: '#',
    },
];

interface Event {
    id: number;
    title: string;
    start_datetime: string;
    end_datetime: string;
}

interface Venue {
    id: number;
    name: string;
    city: string;
    state: string;
    capacity: number;
    accessibility: string[];
    layout: string[];
    tags: string;
    avg_ratings: number;
    latitude: string;
    longitude: string;
    events?: Event[];
    created_at: string;
    updated_at: string;
}

interface VenueShowProps {
    venue: Venue;
}

export default function VenueShow({ venue }: VenueShowProps) {
    const formatDate = (dateTime: string) => {
        const date = new Date(dateTime);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatDateTime = (dateTime: string) => {
        const date = new Date(dateTime);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatAccessibility = (option: string) => {
        return option.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    const formatLayout = (option: string) => {
        return option.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${venue.name} - Venue Details`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/venues">
                                <ArrowLeftIcon className="size-4" />
                            </Link>
                        </Button>
                        <Heading title={venue.name} />
                    </div>
                    <Button variant="outline" asChild>
                        <Link href={`/venues/${venue.id}/edit`}>
                            <PencilIcon className="size-4 mr-2" />
                            Edit Venue
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPinIcon className="size-5" />
                                Location Information
                            </CardTitle>
                            <CardDescription>Venue location details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Venue Name</p>
                                <p className="text-lg font-semibold">{venue.name}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">City</p>
                                <p className="text-base">{venue.city}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">State</p>
                                <p className="text-base">{venue.state}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Coordinates</p>
                                <p className="text-base text-muted-foreground">
                                    {venue.latitude}, {venue.longitude}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <UsersIcon className="size-5" />
                                Capacity & Ratings
                            </CardTitle>
                            <CardDescription>Venue capacity and ratings</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Capacity</p>
                                <p className="text-lg font-semibold">{venue.capacity.toLocaleString()} people</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                                <div className="flex items-center gap-2">
                                    <StarIcon className="size-5 text-yellow-500 fill-yellow-500" />
                                    <p className="text-lg font-semibold">{venue.avg_ratings.toFixed(1)} / 5.0</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Accessibility Features</CardTitle>
                            <CardDescription>Available accessibility options</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {venue.accessibility && venue.accessibility.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {venue.accessibility.map((option) => (
                                        <Badge key={option} variant="secondary">
                                            {formatAccessibility(option)}
                                        </Badge>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">No accessibility features listed</p>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Layout Options</CardTitle>
                            <CardDescription>Available seating layouts</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {venue.layout && venue.layout.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {venue.layout.map((option) => (
                                        <Badge key={option} variant="outline">
                                            {formatLayout(option)}
                                        </Badge>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">No layout options listed</p>
                            )}
                        </CardContent>
                    </Card>

                    {venue.tags && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TagIcon className="size-5" />
                                    Tags
                                </CardTitle>
                                <CardDescription>Venue tags and categories</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {Array.isArray(venue.tags) ? (
                                    <div className="flex flex-wrap gap-2">
                                        {venue.tags.map((tag, index) => (
                                            <Badge key={index} variant="secondary">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-base">{venue.tags}</p>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    <Card>
                        <CardHeader>
                            <CardTitle>Additional Information</CardTitle>
                            <CardDescription>Venue metadata</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Created At</p>
                                <p className="text-base">{formatDate(venue.created_at)}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                                <p className="text-base">{formatDate(venue.updated_at)}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

