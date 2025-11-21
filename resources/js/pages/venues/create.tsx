import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeftIcon, CheckCircleIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Venues',
        href: '/venues',
    },
    {
        title: 'Create Venue',
        href: '/venues/create',
    },
];

const ACCESSIBILITY_OPTIONS = [
    'wheelchair',
    'parking',
    'audio_assist',
    'elevator',
];

const LAYOUT_OPTIONS = [
    'theater',
    'classroom',
    'banquet',
    'u_shape',
];

export default function CreateVenue() {
    const [accessibility, setAccessibility] = useState<string[]>([]);
    const [layout, setLayout] = useState<string[]>([]);
    const page = usePage();
    const flash = page.props.flash as { success?: string } | undefined;
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    useEffect(() => {
        if (flash?.success) {
            setShowSuccessDialog(true);
            // Reset form fields
            setAccessibility([]);
            setLayout([]);
        }
    }, [flash?.success]);

    const handleAccessibilityChange = (option: string, checked: boolean) => {
        if (checked) {
            setAccessibility([...accessibility, option]);
        } else {
            setAccessibility(accessibility.filter(item => item !== option));
        }
    };

    const handleLayoutChange = (option: string, checked: boolean) => {
        if (checked) {
            setLayout([...layout, option]);
        } else {
            setLayout(layout.filter(item => item !== option));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Venue" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/venues">
                            <ArrowLeftIcon className="size-4" />
                        </Link>
                    </Button>
                    <Heading title="Create Venue" />
                </div>
                <div className="max-w-2xl">
                    <Form
                        action="/venues"
                        method="post"
                        className="flex flex-col gap-6"
                        options={{
                            preserveState: true,
                        }}
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            name="name"
                                            placeholder="Venue name"
                                            required
                                            autoFocus
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input
                                            id="city"
                                            type="text"
                                            name="city"
                                            placeholder="City"
                                            required
                                        />
                                        <InputError message={errors.city} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="state">State</Label>
                                        <Input
                                            id="state"
                                            type="text"
                                            name="state"
                                            placeholder="State"
                                            required
                                        />
                                        <InputError message={errors.state} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="capacity">Capacity</Label>
                                        <Input
                                            id="capacity"
                                            type="number"
                                            name="capacity"
                                            placeholder="Capacity"
                                            required
                                            min="1"
                                        />
                                        <InputError message={errors.capacity} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>Accessibility</Label>
                                        <div className="flex flex-col gap-2">
                                            {ACCESSIBILITY_OPTIONS.map((option) => (
                                                <div key={option} className="flex items-center gap-2">
                                                    <Checkbox
                                                        id={`accessibility-${option}`}
                                                        checked={accessibility.includes(option)}
                                                        onCheckedChange={(checked) => {
                                                            handleAccessibilityChange(option, checked as boolean);
                                                        }}
                                                    />
                                                    <Label
                                                        htmlFor={`accessibility-${option}`}
                                                        className="font-normal cursor-pointer capitalize"
                                                    >
                                                        {option.replace('_', ' ')}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                        {accessibility.map((option) => (
                                            <input
                                                key={option}
                                                type="hidden"
                                                name="accessibility[]"
                                                value={option}
                                            />
                                        ))}
                                        <InputError message={errors.accessibility} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>Layout</Label>
                                        <div className="flex flex-col gap-2">
                                            {LAYOUT_OPTIONS.map((option) => (
                                                <div key={option} className="flex items-center gap-2">
                                                    <Checkbox
                                                        id={`layout-${option}`}
                                                        checked={layout.includes(option)}
                                                        onCheckedChange={(checked) => {
                                                            handleLayoutChange(option, checked as boolean);
                                                        }}
                                                    />
                                                    <Label
                                                        htmlFor={`layout-${option}`}
                                                        className="font-normal cursor-pointer capitalize"
                                                    >
                                                        {option.replace('_', ' ')}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                        {layout.map((option) => (
                                            <input
                                                key={option}
                                                type="hidden"
                                                name="layout[]"
                                                value={option}
                                            />
                                        ))}
                                        <InputError message={errors.layout} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="avg_ratings">Average Ratings</Label>
                                        <Input
                                            id="avg_ratings"
                                            type="number"
                                            name="avg_ratings"
                                            placeholder="0.0 - 5.0"
                                            required
                                            min="0"
                                            max="5"
                                            step="0.1"
                                        />
                                        <InputError message={errors.avg_ratings} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="tags">Tags</Label>
                                        <Input
                                            id="tags"
                                            type="text"
                                            name="tags"
                                            placeholder="Tag 1, Tag 2, Tag 3"
                                            required
                                        />
                                        <InputError message={errors.tags} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="latitude">Latitude</Label>
                                        <Input
                                            id="latitude"
                                            type="number"
                                            name="latitude"
                                            placeholder="Latitude"
                                            required
                                            step="any"
                                        />
                                        <InputError message={errors.latitude} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="longitude">Longitude</Label>
                                        <Input
                                            id="longitude"
                                            type="number"
                                            name="longitude"
                                            placeholder="Longitude"
                                            required
                                            step="any"
                                        />
                                        <InputError message={errors.longitude} />
                                    </div>

                                    <div className="flex gap-4">
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="flex-1"
                                        >
                                            {processing && <Spinner />}
                                            Create Venue
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            asChild
                                            disabled={processing}
                                        >
                                            <Link href="/venues">Cancel</Link>
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
                            Venue Created Successfully
                        </DialogTitle>
                        <DialogDescription>
                            Your venue has been created successfully. 
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            onClick={() => {
                                setShowSuccessDialog(false);
                                router.visit('/venues', {
                                    preserveState: false,
                                    preserveScroll: false,
                                });
                            }}
                        >
                            Go to Venues List
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}

