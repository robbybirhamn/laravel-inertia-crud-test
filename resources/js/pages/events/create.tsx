import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import { store, index } from '@/routes/events';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeftIcon, CheckCircleIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import SelectVenue from '@/components/select-venue';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Events',
        href: index().url,
    },
    {
        title: 'Create Event',
        href: '/events/create',
    },
];

export default function CreateEvent() {
    const [venueId, setVenueId] = useState<string | null>(null);
    const page = usePage();
    const flash = page.props.flash as { success?: string } | undefined;
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    useEffect(() => {
        if (flash?.success) {
            setShowSuccessDialog(true);
            // Reset form fields
            setVenueId(null);
        }
    }, [flash?.success]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Event" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={index().url}>
                            <ArrowLeftIcon className="size-4" />
                        </Link>
                    </Button>
                    <Heading title="Create Event" />
                </div>
                <div className="max-w-2xl">
                    <Form
                        {...store.form()}
                        className="flex flex-col gap-6"
                        options={{
                            preserveState: true,
                        }}
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            type="text"
                                            name="title"
                                            placeholder="Event title"
                                            required
                                            autoFocus
                                        />
                                        <InputError message={errors.title} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="venue_id">Venue</Label>
                                        <SelectVenue
                                            name="venue_id"
                                            value={venueId ?? undefined}
                                            onChange={setVenueId}
                                            placeholder="Search for a venue..."
                                            error={errors.venue_id}
                                        />
                                        <InputError message={errors.venue_id} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="start_datetime">Start Date & Time</Label>
                                        <Input
                                            id="start_datetime"
                                            type="datetime-local"
                                            name="start_datetime"
                                            required
                                        />
                                        <InputError message={errors.start_datetime} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="end_datetime">End Date & Time</Label>
                                        <Input
                                            id="end_datetime"
                                            type="datetime-local"
                                            name="end_datetime"
                                            required
                                        />
                                        <InputError message={errors.end_datetime} />
                                    </div>

                                    <div className="flex gap-4">
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="flex-1"
                                        >
                                            {processing && <Spinner />}
                                            Create Event
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            asChild
                                            disabled={processing}
                                        >
                                            <Link href={index().url}>Cancel</Link>
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </div>

            <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <CheckCircleIcon className="size-5 text-green-600 dark:text-green-400" />
                            Event Created Successfully
                        </DialogTitle>
                        <DialogDescription>
                            Your event has been created successfully. 
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            onClick={() => {
                                setShowSuccessDialog(false);
                                router.visit(index().url, {
                                    preserveState: false,
                                    preserveScroll: false,
                                });
                            }}
                        >
                            Go to Events List
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}

