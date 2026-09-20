import { Link, useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Bell, CalendarDays, LayoutGrid, Users, User as UserIcon, Moon, Sun } from "lucide-react";
import type { ReactNode } from "react";

import { HelpMenu } from "@/components/hub/HelpHint";
import { UserAvatar } from "@/components/hub/UserAvatar";
import { useProfile } from "@/hooks/useAuth";
import { unreadCount } from "@/lib/hub-api";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/groups", label: "Groups", icon: LayoutGrid, tour: "groups" },
  { to: "/calendar", label: "Calendar", icon: CalendarDays, tour: "calendar" },
  { to: "/friends", label: "Friends", icon: Users, tour: "friends" },
  { to: "/notifications", label: "Alerts", icon: Bell, tour: "notifications" },
  { to: "/profile", label: "You", icon: UserIcon, tour: "profile" },
] as const;

export function Atmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div
        className="absolute -left-32 -top-40 size-[540px] rounded-full blur-3xl"
        style={{ background: "var(--blob-1)" }}
      />
      <div
        className="absolute -right-36 top-1/4 size-[500px] rounded-full blur-3xl"
        style={{ background: "var(--blob-2)" }}
      />
      <div
        className="absolute bottom-0 left-1/4 size-[460px] rounded-full blur-3xl"
        style={{ background: "var(--blob-3)" }}
      />
    </div>
  );
}

function useActivePath() {
  return useRouterState({ select: (s) => s.location.pathname });
}

function HubMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid size-10 place-items-center rounded-2xl bg-primary font-display text-lg font-bold text-primary-foreground",
        className,
      )}
    >
      H
    </div>
  );
}

function ThemeButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "frost" ? "Switch to Chalk theme" : "Switch to Frost theme"}
      className="grid size-10 place-items-center rounded-full glass text-muted-foreground transition hover:text-foreground"
    >
      {theme === "frost" ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </button>
  );
}

function TopBar({ unread }: { unread: number }) {
  const { data: profile } = useProfile();
  return (
    <header className="glass-strong sticky top-0 z-30 rounded-b-3xl md:rounded-none md:border-0 md:bg-transparent md:backdrop-blur-none">
      <div className="flex items-center justify-between px-5 py-3 md:px-8 md:py-6">
        <div className="flex items-center gap-3 md:hidden">
          <HubMark />
          <div className="leading-none">
            <p className="font-display text-[17px] font-semibold">Hub</p>
            <p className="mt-1 text-[10px] font-medium text-muted-foreground">Project coordination</p>
          </div>
        </div>
        <div className="hidden md:block">
          <p className="font-display text-2xl font-semibold">Hub</p>
          <p className="text-sm text-muted-foreground">Self-clearing project coordination</p>
        </div>
        <div className="flex items-center gap-2">
          <HelpMenu />
          <ThemeButton />
          <Link
            to="/notifications"
            className="relative grid size-10 place-items-center rounded-full glass text-muted-foreground transition hover:text-foreground"
            aria-label="Notifications"
          >
            <Bell className="size-4" />
            {unread > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
                {unread}
              </span>
            ) : null}
          </Link>
          <Link to="/profile" aria-label="Your profile">
            <UserAvatar name={profile?.display_name} url={profile?.avatar_url} />
          </Link>
        </div>
      </div>
    </header>
  );
}

function Sidebar({ unread }: { unread: number }) {
  const pathname = useActivePath();
  const { data: profile } = useProfile();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col gap-2 border-r border-border/60 p-5 md:flex glass">
      <div className="mb-6 flex items-center gap-3">
        <HubMark />
        <div>
          <p className="font-display text-lg font-semibold leading-none">Hub</p>
          <p className="mt-1 text-[11px] text-muted-foreground">Wipes itself clean</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV.map(({ to, label, icon: Icon, tour }) => {
          const active = pathname === to || pathname.startsWith(`${to}/`);
          return (
            <Link
              key={to}
              to={to}
              data-tour={tour}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
              {label}
              {to === "/notifications" && unread > 0 ? (
                <span className="ml-auto grid min-w-5 place-items-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
                  {unread}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <Link
        to="/profile"
        className="mt-auto flex items-center gap-3 rounded-2xl glass-inset px-3 py-3 transition hover:opacity-90"
      >
        <UserAvatar name={profile?.display_name} url={profile?.avatar_url} className="size-8" />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{profile?.display_name || "You"}</p>
          <p className="truncate text-[11px] text-muted-foreground">{profile?.school || "Add your school"}</p>
        </div>
      </Link>
    </aside>
  );
}

function BottomTabs({ unread }: { unread: number }) {
  const pathname = useActivePath();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 md:hidden">
      <div className="mx-auto max-w-[430px] px-4 pb-4">
        <div className="glass-strong flex items-center justify-between rounded-3xl px-3 py-2 shadow-panel">
          {NAV.map(({ to, label, icon: Icon, tour }) => {
            const active = pathname === to || pathname.startsWith(`${to}/`);
            return (
              <Link
                key={to}
                to={to}
                data-tour={tour}
                className={cn(
                  "relative flex min-h-14 flex-1 flex-col items-center justify-center gap-1 rounded-2xl transition active:scale-95",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Icon className="size-5" />
                <span className="text-[10px] font-semibold">{label}</span>
                {to === "/notifications" && unread > 0 ? (
                  <span className="absolute right-3 top-2 size-2 rounded-full bg-destructive ring-2 ring-background" />
                ) : null}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const { data: unread = 0 } = useQuery({
    queryKey: ["unread-count"],
    queryFn: unreadCount,
    refetchInterval: 60_000,
  });

  return (
    <div className="relative min-h-screen">
      <Atmosphere />
      <Sidebar unread={unread} />
      <div className="relative md:pl-64">
        <div className="mx-auto w-full max-w-[430px] md:max-w-6xl">
          <TopBar unread={unread} />
          <main className="px-4 pb-32 pt-4 md:px-8 md:pb-12 md:pt-0">{children}</main>
        </div>
      </div>
      <BottomTabs unread={unread} />
    </div>
  );
}
