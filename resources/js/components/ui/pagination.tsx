import * as React from "react"
import { Link } from "@inertiajs/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface PaginationLink {
    url: string | null
    label: string
    active: boolean
}

export interface PaginationMeta {
    current_page: number
    from: number | null
    last_page: number
    per_page: number
    to: number | null
    total: number
    path: string
}

export interface PaginationProps {
    links: PaginationLink[]
    meta?: PaginationMeta
    className?: string
}

export function Pagination({ links, meta, className }: PaginationProps) {
    // Filter out the first (Previous) and last (Next) links for separate rendering
    const pageLinks = links.slice(1, -1)
    const previousLink = links[0]
    const nextLink = links[links.length - 1]

    if (links.length <= 3) {
        // Only Previous/Next buttons, no page numbers
        return null
    }

    return (
        <nav
            aria-label="pagination"
            className={cn("flex items-center justify-center gap-2", className)}
        >
            <div className="flex items-center gap-1">
                {/* Previous Button */}
                {previousLink.url ? (
                    <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="gap-1"
                    >
                        <Link href={previousLink.url} preserveScroll>
                            <ChevronLeft className="size-4" />
                            <span className="sr-only sm:not-sr-only">
                                Previous
                            </span>
                        </Link>
                    </Button>
                ) : (
                    <Button
                        variant="outline"
                        size="sm"
                        disabled
                        className="gap-1"
                    >
                        <ChevronLeft className="size-4" />
                        <span className="sr-only sm:not-sr-only">Previous</span>
                    </Button>
                )}

                {/* Page Number Buttons */}
                <div className="flex items-center gap-1">
                    {pageLinks.map((link, index) => {
                        if (link.url) {
                            return (
                                <Button
                                    key={index}
                                    variant={link.active ? "default" : "outline"}
                                    size="sm"
                                    asChild
                                    className={cn(
                                        "min-w-9",
                                        link.active && "pointer-events-none"
                                    )}
                                >
                                    <Link href={link.url} preserveScroll>
                                        {link.label}
                                    </Link>
                                </Button>
                            )
                        } else {
                            // Ellipsis or disabled page
                            return (
                                <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    disabled
                                    className="min-w-9"
                                >
                                    {link.label}
                                </Button>
                            )
                        }
                    })}
                </div>

                {/* Next Button */}
                {nextLink.url ? (
                    <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="gap-1"
                    >
                        <Link href={nextLink.url} preserveScroll>
                            <span className="sr-only sm:not-sr-only">Next</span>
                            <ChevronRight className="size-4" />
                        </Link>
                    </Button>
                ) : (
                    <Button
                        variant="outline"
                        size="sm"
                        disabled
                        className="gap-1"
                    >
                        <span className="sr-only sm:not-sr-only">Next</span>
                        <ChevronRight className="size-4" />
                    </Button>
                )}
            </div>

            {/* Pagination Info */}
            {meta && (
                <div className="hidden text-sm text-muted-foreground sm:block">
                    Showing {meta.from ?? 0} to {meta.to ?? 0} of {meta.total}{" "}
                    results
                </div>
            )}
        </nav>
    )
}

