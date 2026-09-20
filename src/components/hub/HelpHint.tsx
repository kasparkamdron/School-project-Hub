/**
 * Small inline help affordances.
 *
 * MAINTENANCE: when a feature gains something non-obvious, add a <HelpHint />
 * next to its heading rather than writing a paragraph into the page.
 */
import { HelpCircle, LifeBuoy, Compass } from "lucide-react";

import { startTour } from "@/components/hub/TourGuide";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function HelpHint({
  title,
  points,
  className,
}: {
  title: string;
  points: string[];
  className?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`Help: ${title}`}
          className={cn(
            "grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground transition hover:bg-sidebar-accent/60 hover:text-foreground",
            className,
          )}
        >
          <HelpCircle className="size-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[260px] rounded-3xl p-4">
        <p className="font-display text-[15px] font-semibold leading-tight">{title}</p>
        <ul className="mt-2 space-y-1.5">
          {points.map((p) => (
            <li key={p} className="flex gap-2 text-[12px] leading-relaxed text-muted-foreground">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

/** Always-available help button for the top bar. */
export function HelpMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          data-tour="help"
          aria-label="Help"
          className="grid size-10 place-items-center rounded-full glass text-muted-foreground transition hover:text-foreground"
        >
          <LifeBuoy className="size-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[280px] rounded-3xl p-4">
        <p className="font-display text-[15px] font-semibold leading-tight">Need a hand?</p>
        <ul className="mt-2 space-y-1.5">
          {[
            "Add friends first — groups can only include people on your friend list.",
            "Tasks and notes keep a project alive; 21 quiet days and it clears itself.",
            "On the calendar, drag a project deadline to move the whole plan.",
            "Look for the ? next to a heading for tips about that part.",
          ].map((p) => (
            <li key={p} className="flex gap-2 text-[12px] leading-relaxed text-muted-foreground">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => startTour()}
          className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-[13px] font-medium text-primary-foreground transition hover:opacity-90"
        >
          <Compass className="size-4" /> Take the tour
        </button>
      </PopoverContent>
    </Popover>
  );
}
