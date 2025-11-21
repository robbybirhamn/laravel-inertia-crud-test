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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Venues',
        href: '/venues',
    },
];

interface Venue {
    id: number;
    name: string;
    city: string;
    state: string;
    capacity: number;
}

interface PaginatedVenues {
    data: Venue[];
    links: PaginationLink[];
    meta: PaginationMeta;
}

interface VenuesIndexProps {
    venues: PaginatedVenues;
    createVenueUrl: string;
}

export default function VenuesIndex({ venues, createVenueUrl }: VenuesIndexProps) {

    const [dialogSuccess, setDialogSuccess] = useState(false);
    const [dialogError, setDialogError] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Venues" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex justify-between">
                    <Heading title="Venues" />
                    <Button asChild>
                        <Link href={createVenueUrl}>
                            <PlusIcon className="size-4" />
                            Create Venue
                        </Link>
                    </Button>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="overflow-x-auto rounded-lg border border-sidebar-border/70 dark:border-sidebar-border">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-sidebar-border/70 dark:border-sidebar-border">
                                    <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium">City</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium">State</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium">Capacity</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {venues.data.map((venue) => (
                                    <tr
                                        key={venue.id}
                                        className="border-b border-sidebar-border/70 dark:border-sidebar-border last:border-0 hover:bg-accent/50"
                                    >
                                        <td className="px-4 py-3 text-sm">
                                            <Link href={`/venues/${venue.id}`} className="font-medium hover:underline">
                                                {venue.name}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3 text-sm">{venue.city}</td>
                                        <td className="px-4 py-3 text-sm">{venue.state}</td>
                                        <td className="px-4 py-3 text-sm">{venue.capacity}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/venues/${venue.id}/edit`}>
                                                    <PencilIcon className="size-4" />
                                                </Link>
                                            </Button>
                                            <DeleteVenue venueId={venue.id} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination links={venues.links} meta={venues.meta} />
                </div>
            </div>
        </AppLayout>
    );
}


function DeleteVenue({ venueId }: { venueId: number }) {
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
                    <DialogTitle>Delete Venue</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Are you sure you want to delete this venue?
                </DialogDescription>
                <DialogFooter>
                    <Button variant="destructive" asChild>
                        <button type="button" onClick={() => router.post(`/venues/${venueId}`,{
                                _method: 'DELETE',
                            }, {
                            onSuccess: () => {
                                alert('Venue deleted successfully');
                            },
                            onError: () => {
                                alert('Venue deletion failed');
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

