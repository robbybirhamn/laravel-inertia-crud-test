import { useState, useEffect, useRef, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { ChevronDownIcon, CheckIcon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Venue {
    id: number;
    name: string;
    city?: string;
    state?: string;
}

interface SelectVenueProps {
    value?: string | number | null;
    onChange?: (venueId: string | null) => void;
    name?: string;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    error?: string;
    initialVenue?: Venue | null;
}

export default function SelectVenue({
    value,
    onChange,
    name = 'venue_id',
    placeholder = 'Search for a venue...',
    className,
    disabled = false,
    error,
    initialVenue,
}: SelectVenueProps) {
    const [searchQuery, setSearchQuery] = useState(initialVenue?.name ?? '');
    const [venues, setVenues] = useState<Venue[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedVenue, setSelectedVenue] = useState<Venue | null>(initialVenue ?? null);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

    const fetchVenueById = useCallback(async (venueId: string | number) => {
        try {
            const response = await fetch(`/venues/search?q=${encodeURIComponent(venueId)}&limit=1`);
            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    const venue = data.find((v: Venue) => v.id === Number(venueId)) || data[0];
                    setSelectedVenue(venue);
                    setSearchQuery(venue.name);
                }
            }
        } catch (error) {
            console.error('Error fetching venue:', error);
        }
    }, []);

    useEffect(() => {
        const numericValue = value ? Number(value) : null;
        const currentVenueId = selectedVenue?.id;

        if (initialVenue && numericValue === initialVenue.id && currentVenueId !== numericValue) {
            setSelectedVenue(initialVenue);
            setSearchQuery(initialVenue.name);
            return;
        }

        if (numericValue && currentVenueId !== numericValue && value !== null && value !== undefined) {
            fetchVenueById(value);
        } else if (!value && selectedVenue) {
            setSelectedVenue(null);
            setSearchQuery('');
        }
    }, [value, selectedVenue?.id, fetchVenueById, initialVenue]);

    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setHighlightedIndex(-1);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);

    const searchVenues = useCallback(async (query: string) => {
        if (query.trim().length === 0) {
            setVenues([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`/venues/search?q=${encodeURIComponent(query)}&limit=20`);
            if (response.ok) {
                const data = await response.json();
                setVenues(data);
            } else {
                setVenues([]);
            }
        } catch (error) {
            console.error('Error searching venues:', error);
            setVenues([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        setSelectedVenue(null);
        setHighlightedIndex(-1);

        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {
            if (query.trim().length > 0) {
                setIsOpen(true);
                searchVenues(query);
            } else {
                setVenues([]);
                setIsOpen(false);
            }
        }, 300);
    };

    const handleSelectVenue = (venue: Venue) => {
        setSelectedVenue(venue);
        setSearchQuery(venue.name);
        setIsOpen(false);
        setHighlightedIndex(-1);
        onChange?.(String(venue.id));
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedVenue(null);
        setSearchQuery('');
        setVenues([]);
        setIsOpen(false);
        onChange?.(null);
        inputRef.current?.focus();
    };

    const handleInputFocus = () => {
        if (searchQuery.trim().length > 0 && venues.length > 0) {
            setIsOpen(true);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isOpen && e.key === 'ArrowDown') {
            e.preventDefault();
            if (venues.length > 0) {
                setIsOpen(true);
                setHighlightedIndex(0);
            }
            return;
        }

        if (!isOpen) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex((prev) =>
                    prev < venues.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0 && venues[highlightedIndex]) {
                    handleSelectVenue(venues[highlightedIndex]);
                }
                break;
            case 'Escape':
                e.preventDefault();
                setIsOpen(false);
                setHighlightedIndex(-1);
                break;
        }
    };

    useEffect(() => {
        if (highlightedIndex >= 0 && listRef.current) {
            const items = listRef.current.querySelectorAll('[data-venue-item]');
            const highlightedItem = items[highlightedIndex] as HTMLElement;
            if (highlightedItem) {
                highlightedItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
        }
    }, [highlightedIndex]);

    const displayValue = selectedVenue ? selectedVenue.name : searchQuery;
    const showClearButton = selectedVenue || searchQuery.length > 0;

    return (
        <div ref={containerRef} className={cn('relative', className)}>
            <div className="relative">
                <Input
                    ref={inputRef}
                    type="text"
                    name={name}
                    value={displayValue}
                    onChange={handleSearchChange}
                    onFocus={handleInputFocus}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={cn(
                        'pr-20',
                        error && 'border-destructive aria-invalid:border-destructive'
                    )}
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    role="combobox"
                    autoComplete="off"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {isLoading && (
                        <Spinner className="size-4" />
                    )}
                    {showClearButton && !disabled && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-6 h-6 w-6"
                            onClick={handleClear}
                            aria-label="Clear selection"
                        >
                            <XIcon className="size-3" />
                        </Button>
                    )}
                    <ChevronDownIcon
                        className={cn(
                            'size-4 text-muted-foreground transition-transform',
                            isOpen && 'rotate-180'
                        )}
                    />
                </div>
            </div>

            <input 
                type="hidden" 
                name={name} 
                value={selectedVenue?.id ?? ''} 
            />

            {isOpen && (
                <div
                    ref={listRef}
                    className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover shadow-md"
                    role="listbox"
                >
                    {venues.length === 0 && !isLoading && searchQuery.trim().length > 0 && (
                        <div className="px-3 py-2 text-sm text-muted-foreground">
                            No venues found
                        </div>
                    )}
                    {venues.length === 0 && !isLoading && searchQuery.trim().length === 0 && (
                        <div className="px-3 py-2 text-sm text-muted-foreground">
                            Start typing to search venues...
                        </div>
                    )}
                    {venues.map((venue, index) => (
                        <div
                            key={venue.id}
                            data-venue-item
                            className={cn(
                                'flex cursor-pointer items-center gap-2 px-3 py-2 text-sm transition-colors',
                                'hover:bg-accent hover:text-accent-foreground',
                                highlightedIndex === index && 'bg-accent text-accent-foreground',
                                selectedVenue?.id === venue.id && 'bg-accent/50'
                            )}
                            onClick={() => handleSelectVenue(venue)}
                            role="option"
                            aria-selected={selectedVenue?.id === venue.id}
                        >
                            <div className="flex-1">
                                <div className="font-medium">{venue.name}</div>
                                {(venue.city || venue.state) && (
                                    <div className="text-xs text-muted-foreground">
                                        {[venue.city, venue.state].filter(Boolean).join(', ')}
                                    </div>
                                )}
                            </div>
                            {selectedVenue?.id === venue.id && (
                                <CheckIcon className="size-4 text-primary" />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

