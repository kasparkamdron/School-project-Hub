import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, CalendarClock, CheckCheck, FolderPlus, ListChecks, UserPlus } from "lucide-react";
import { useEffect } from "react";

import { AppShell } from "@/components/hub/AppShell";
import { HelpHint } from "@/components/hub/HelpHint";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { shortWhen } from "@/lib/dates";
import { listNotifications, markAllRead, type HubNotification } from "@/lib/hub-api";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Hub" },
      { name: "description", content: "Friend requests, group invites, task assignments and deadlines coming up." },
      { property: "og:title", content: "Notifications — Hub" },
      { property: "og:description", content: "Everything that needs your attention across your project groups." },
    ],
  }),
  component: NotificationsPage,
});

const ICONS = {
  friend_request: UserPlus,
  friend_accepted: UserPlus,
  group_added: FolderPlus,
  task_assigned: ListChecks,
  deadline: CalendarClock,
} as const;

function Row({ item }: { item: HubNotification }) {
  const Icon = ICONS[item.kind] ?? Bell;
  const body = (
    <div
      className={cn(
        "flex items-start gap-3 rounded-[18px] glass p-4",
        !item.read && "border-primary/40",
      )}
    >
      <div className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/12 text-primary">
        <Icon className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{item.body}</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">{shortWhen(item.created_at)}</p>
      </div>
      {!item.read ? <span className="mt-2 size-2 shrink-0 rounded-full bg-primary" /> : null}
    </div>
  );

  if (item.kind === "friend_request" || item.kind === "friend_accepted") {
    return <Link to="/friends">{body}</Link>;
  }
  if (item.groupId) {
    return (
      <Link to="/groups/$groupId" params={{ groupId: item.groupId }}>
        {body}
      </Link>
    );
  }
  return body;
}

function NotificationsPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const items = useQuery({
    queryKey: ["notifications", user?.id],
    enabled: !!user,
    queryFn: () => listNotifications(user!.id),
  });

  useEffect(() => {
    const channel = supabase
      .channel("notifications-feed")
      .on("postgres_changes", { event: "*", schema: "public", table: "notifications" }, () => {
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
        queryClient.invalidateQueries({ queryKey: ["unread-count"] });
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const readAll = useMutation({
    mutationFn: markAllRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unread-count"] });
    },
  });

  const hasUnread = (items.data ?? []).some((i) => !i.read);

  return (
    <AppShell>
      <section className="glass rounded-[22px] p-5 shadow-panel">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Alerts</p>
        <div className="mt-1 flex items-end justify-between gap-3">
          <h1 className="font-display text-[26px] font-semibold leading-tight">What needs you</h1>
          <HelpHint
            className="ml-auto"
            title="About alerts"
            points={[
              "Friend requests, new groups and tasks assigned to you land here.",
              "Deadline reminders appear automatically three days before the date.",
              "A dot means you haven't read it yet — tap an alert to jump to the group or person.",
            ]}
          />
          {hasUnread ? (
            <Button size="sm" variant="secondary" className="rounded-full" onClick={() => readAll.mutate()}>
              <CheckCheck className="size-4" /> Mark read
            </Button>
          ) : null}
        </div>
      </section>

      <section className="mt-4 grid gap-2 md:grid-cols-2">
        {items.isLoading ? (
          <Skeleton className="h-20 rounded-[18px]" />
        ) : items.data && items.data.length > 0 ? (
          items.data.map((item) => <Row key={item.id} item={item} />)
        ) : (
          <p className="rounded-[18px] glass p-5 text-sm text-muted-foreground md:col-span-2">
            Nothing here yet. Friend requests, group invites, task assignments and approaching deadlines show up on
            this list.
          </p>
        )}
      </section>
    </AppShell>
  );
}
