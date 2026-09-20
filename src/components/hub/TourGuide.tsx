/**
 * Guided tour of Hub.
 *
 * MAINTENANCE: whenever a new screen or major feature is added to the app,
 * add a step to TOUR_STEPS below (with a matching data-tour="..." attribute on
 * the element it points at) and bump TOUR_VERSION so people who already saw the
 * tour get shown the new part once.
 */
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Compass, X } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

export const TOUR_VERSION = 5;
const STORAGE_KEY = "hub-tour-seen";

type Step = {
  target: string;
  route: "/groups" | "/calendar" | "/friends" | "/notifications" | "/profile";
  title: string;
  body: string;
  tip?: string;
};

const TOUR_STEPS: Step[] = [
  {
    target: '[data-tour="groups"]',
    route: "/groups",
    title: "Your project groups",
    body: "Every group you're working on lives here. Tap one to open its tasks and notes.",
    tip: "A group nobody touches for 30 days, or one that is 14 days past its deadline, disappears on its own — no clean-up needed.",
  },
  {
    target: '[data-tour="new-group"]',
    route: "/groups",
    title: "Start a group",
    body: "Use the plus button to create a project and pick members from your friend list.",
    tip: "Nobody to pick yet? Add friends first — that's the Friends tab.",
  },
  {
    target: '[data-tour="calendar"]',
    route: "/calendar",
    title: "Calendar view",
    body: "Everything laid out by date, with a list for the day you tap and what's coming up.",
    tip: "Drag a project deadline onto another day and every dated task shifts with it. On a phone, tap the grip handle then tap a day.",
  },
  {
    target: '[data-tour="calendar-filters"]',
    route: "/calendar",
    title: "Narrow it down",
    body: "Show only projects, only tasks, or one single project, and hide anything already finished.",
    tip: "The progress bars below the month also work as filters — tap one to focus that project.",
  },
  {
    target: '[data-tour="friends"]',
    route: "/friends",
    title: "Friends",
    body: "Search classmates, send and accept requests. You can only add friends to a group, so start here.",
    tip: "Blocking someone stops their requests and keeps them out of your groups.",
  },
  {
    target: '[data-tour="notifications"]',
    route: "/notifications",
    title: "Alerts",
    body: "Friend requests, tasks assigned to you and deadlines coming up in the next three days.",
  },
  {
    target: '[data-tour="help"]',
    route: "/notifications",
    title: "Help whenever you need it",
    body: "This button has the short version of everything, plus a way to restart this tour.",
    tip: "A small ? next to a heading explains that part of the screen.",
  },
  {
    target: '[data-tour="profile"]',
    route: "/profile",
    title: "You",
    body: "Change your name, school and theme, download your data, or delete your account.",
    tip: "You can replay this tour from here anytime.",
  },
];

type Box = { top: number; left: number; width: number; height: number };

function visibleTarget(selector: string) {
  if (!selector) return null;
  // Nav targets exist twice (desktop sidebar + mobile tabs); use the visible one.
  return (
    Array.from(document.querySelectorAll(selector)).find((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 || r.height > 0;
    }) ?? null
  );
}

function useSpotlight(selector: string, active: boolean) {
  const [box, setBox] = useState<Box | null>(null);

  const measure = useCallback(() => {
    if (!active) return;
    const el = visibleTarget(selector);
    if (!el) {
      setBox(null);
      return;
    }
    const r = el.getBoundingClientRect();
    setBox({ top: r.top, left: r.left, width: r.width, height: r.height });
  }, [selector, active]);

  useLayoutEffect(() => {
    if (!active) return;
    measure();
    const id = window.setInterval(measure, 250);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [measure, active]);

  return box;
}

export function startTour() {
  window.dispatchEvent(new CustomEvent("hub:start-tour"));
}

export function TourGuide() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Only inside the signed-in app — not on the landing page or onboarding.
  const inApp = TOUR_STEPS.some((s) => pathname === s.route || pathname.startsWith(`${s.route}/`));

  useEffect(() => {
    const onStart = () => {
      setIndex(0);
      setOpen(true);
    };
    window.addEventListener("hub:start-tour", onStart);
    return () => window.removeEventListener("hub:start-tour", onStart);
  }, []);

  useEffect(() => {
    if (!inApp) return;
    const seen = Number(window.localStorage.getItem(STORAGE_KEY) ?? "0");
    if (seen < TOUR_VERSION) {
      setIndex(0);
      setOpen(true);
      window.localStorage.setItem(STORAGE_KEY, String(TOUR_VERSION));
    }
  }, [inApp]);

  const step = TOUR_STEPS[index];

  useEffect(() => {
    if (!open || !step) return;
    if (pathname !== step.route) navigate({ to: step.route });
  }, [open, step, pathname, navigate]);

  // Bring the highlighted element into view on each step.
  const scrolledFor = useRef<string | null>(null);
  useEffect(() => {
    if (!open || !step) return;
    const key = `${index}-${pathname}`;
    if (scrolledFor.current === key) return;
    const id = window.setTimeout(() => {
      const el = visibleTarget(step.target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        scrolledFor.current = key;
      }
    }, 250);
    return () => window.clearTimeout(id);
  }, [open, step, index, pathname]);

  const box = useSpotlight(step?.target ?? "", open);

  const finish = useCallback(() => {
    window.localStorage.setItem(STORAGE_KEY, String(TOUR_VERSION));
    setOpen(false);
  }, []);

  const last = index === TOUR_STEPS.length - 1;

  const next = useCallback(() => {
    if (index === TOUR_STEPS.length - 1) finish();
    else setIndex((i) => i + 1);
  }, [index, finish]);

  const back = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
      if (e.key === "ArrowRight" || e.key === "Enter") next();
      if (e.key === "ArrowLeft") back();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, finish, next, back]);

  if (!open || !step) return null;

  const cardBelow = box ? box.top < window.innerHeight / 2 : true;
  const progress = ((index + 1) / TOUR_STEPS.length) * 100;

  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-foreground/45 backdrop-blur-[2px]" onClick={finish} />

      {box ? (
        <div
          className="pointer-events-none absolute rounded-3xl ring-2 ring-primary transition-all duration-200"
          style={{
            top: box.top - 6,
            left: box.left - 6,
            width: box.width + 12,
            height: box.height + 12,
            boxShadow: "0 0 0 9999px rgba(0,0,0,0.01)",
            background: "transparent",
          }}
        />
      ) : null}

      <div
        className="absolute inset-x-0 px-4"
        style={
          box
            ? cardBelow
              ? { top: Math.min(box.top + box.height + 16, Math.max(window.innerHeight - 300, 16)) }
              : { top: Math.max(box.top - 290, 16) }
            : { top: "50%", transform: "translateY(-50%)" }
        }
      >
        <div className="glass-strong mx-auto w-full max-w-[420px] rounded-[26px] p-5 shadow-panel">
          <div className="flex items-start gap-3">
            <div className="grid size-9 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary">
              <Compass className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                Tour {index + 1} of {TOUR_STEPS.length}
              </p>
              <h2 className="mt-1 font-display text-[19px] font-semibold leading-tight">{step.title}</h2>
            </div>
            <button
              type="button"
              onClick={finish}
              aria-label="Skip the tour"
              className="ml-auto grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground transition hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>

          <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{step.body}</p>

          {step.tip ? (
            <p className="mt-3 rounded-2xl bg-primary/10 p-3 text-[12px] leading-relaxed text-foreground">
              <span className="font-semibold text-primary">Tip · </span>
              {step.tip}
            </p>
          ) : null}

          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={finish}
              className="text-[12px] font-medium text-muted-foreground transition hover:text-foreground"
            >
              Skip tour
            </button>
            <div className="ml-auto flex gap-2">
              {index > 0 ? (
                <Button variant="ghost" className="h-10 rounded-full px-3" onClick={back}>
                  <ArrowLeft className="size-4" /> Back
                </Button>
              ) : null}
              <Button className="h-10 rounded-full px-4" onClick={next}>
                {last ? "Got it" : "Next"}
                {last ? null : <ArrowRight className="size-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
