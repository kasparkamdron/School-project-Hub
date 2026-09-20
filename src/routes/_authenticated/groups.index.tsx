import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/hub/AppShell";
import { HelpHint } from "@/components/hub/HelpHint";
import { ResponsiveSheet } from "@/components/hub/ResponsiveSheet";
import { AvatarStack, UserAvatar } from "@/components/hub/UserAvatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { dueLabel, dueTone, fromDayInput } from "@/lib/dates";
import {
  countQuietGroups,
  createGroup,
  listActiveGroups,
  listFriendEdges,
  type GroupSummary,
} from "@/lib/hub-api";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/groups/")({
  head: () => ({
    meta: [
      { title: "Your groups — Hub" },
      { name: "description", content: "Every project group you are still actively working on, in one list." },
      { property: "og:title", content: "Your groups — Hub" },
      { property: "og:description", content: "Active project groups, tasks done, and what is due next." },
    ],
  }),
  component: GroupsPage,
});

const toneClass: Record<string, string> = {
  calm: "bg-muted text-muted-foreground",
  soon: "bg-warning/15 text-warning",
  late: "bg-destructive/15 text-destructive",
};

function GroupCard({ group }: { group: GroupSummary }) {
  const pct = group.taskTotal ? Math.round((group.taskDone / group.taskTotal) * 100) : 0;
  const label = dueLabel(group.deadline);
  const tone = dueTone(group.deadline);

  return (
    <Link
      to="/groups/$groupId"
      params={{ groupId: group.id }}
      className="block rounded-[22px] glass p-4 transition active:scale-[0.99] hover:shadow-panel"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate font-display text-[18px] font-semibold">{group.name}</h2>
          {group.description ? (
            <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{group.description}</p>
          ) : null}
        </div>
        {label ? (
          <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold", toneClass[tone])}>
            {label}
          </span>
        ) : null}
      </div>

      <div className="mt-3">
        <AvatarStack people={group.members} />
      </div>

      <div className="mt-3">
        <div className="mb-1.5 flex justify-between text-[11px] font-medium">
          <span>
            {group.taskDone} of {group.taskTotal} {group.taskTotal === 1 ? "task" : "tasks"} done
          </span>
          <span className="text-primary">{pct}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </Link>
  );
}

function CreateGroupSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [picked, setPicked] = useState<string[]>([]);

  const { data: edges = [] } = useQuery({
    queryKey: ["friend-edges", user?.id],
    enabled: !!user,
    queryFn: () => listFriendEdges(user!.id),
  });
  const friends = useMemo(() => edges.filter((e) => e.status === "accepted").map((e) => e.other), [edges]);

  const create = useMutation({
    mutationFn: async () => {
      if (name.trim().length < 2) throw new Error("Give the group a name.");
      return createGroup({
        name,
        description,
        deadline: fromDayInput(deadline),
        memberIds: picked,
      });
    },
    onSuccess: async (groupId) => {
      await queryClient.invalidateQueries({ queryKey: ["groups"] });
      onOpenChange(false);
      setName("");
      setDescription("");
      setDeadline("");
      setPicked([]);
      navigate({ to: "/groups/$groupId", params: { groupId } });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <ResponsiveSheet
      open={open}
      onOpenChange={onOpenChange}
      title="New group"
      description="Only your friends can be added to a group."
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="group-name">Name</Label>
          <Input
            id="group-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Marketing Case Study"
            className="h-12 rounded-2xl"
            maxLength={80}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="group-desc">Description (optional)</Label>
          <Textarea
            id="group-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Positioning & go-to-market for Fable Coffee."
            className="min-h-20 rounded-2xl"
            maxLength={400}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="group-deadline">Deadline (optional)</Label>
          <Input
            id="group-deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="h-12 rounded-2xl"
          />
        </div>

        <div className="space-y-2">
          <Label>Members</Label>
          {friends.length === 0 ? (
            <p className="rounded-2xl glass-inset p-3 text-xs text-muted-foreground">
              You have no friends yet. Add classmates on the Friends tab first — you can still create the group and
              add them later.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {friends.map((f) => {
                const active = picked.includes(f.id);
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() =>
                      setPicked((prev) => (active ? prev.filter((id) => id !== f.id) : [...prev, f.id]))
                    }
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full py-1.5 pl-1 pr-3 text-xs font-medium transition",
                      active ? "bg-primary text-primary-foreground" : "glass-inset text-foreground",
                    )}
                  >
                    <UserAvatar name={f.display_name} url={f.avatar_url} className="size-6" />
                    {f.display_name}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <Button
          className="h-13 w-full rounded-2xl text-base"
          onClick={() => create.mutate()}
          disabled={create.isPending}
        >
          {create.isPending ? "Creating…" : "Create group"}
        </Button>
      </div>
    </ResponsiveSheet>
  );
}

function GroupsPage() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: groups, isLoading } = useQuery({ queryKey: ["groups"], queryFn: listActiveGroups });
  const { data: quiet = 0 } = useQuery({ queryKey: ["groups", "quiet"], queryFn: countQuietGroups });

  useEffect(() => {
    const channel = supabase
      .channel("groups-feed")
      .on("postgres_changes", { event: "*", schema: "public", table: "tasks" }, () =>
        queryClient.invalidateQueries({ queryKey: ["groups"] }),
      )
      .on("postgres_changes", { event: "*", schema: "public", table: "group_members" }, () =>
        queryClient.invalidateQueries({ queryKey: ["groups"] }),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return (
    <AppShell>
      <section className="glass relative overflow-hidden rounded-[22px] p-5 shadow-panel">
        <div className="flex items-start gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Your groups</p>
          <HelpHint
            className="ml-auto -mt-1"
            title="How groups work"
            points={[
              "Create a group with the plus button and pick members from your friend list.",
              "Adding or finishing a task, or writing a note, keeps the group alive.",
              "A group leaves this list 30 days after its last activity, or 14 days after its deadline, then gets deleted.",
            ]}
          />
        </div>
        <h1 className="mt-1 max-w-[16ch] text-balance font-display text-[30px] font-semibold leading-[1.05] md:text-[36px]">
          The board, wiped clean each term.
        </h1>
        <p className="mt-2 max-w-[42ch] text-pretty text-[13px] text-muted-foreground">
          Quiet groups drop off after 30 days of no work — or 14 days after the deadline — so nothing lingers.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full glass-inset px-2.5 py-1 text-[11px] font-medium">
            {groups?.length ?? 0} active
          </span>
          {quiet > 0 ? (
            <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
              {quiet} clearing out
            </span>
          ) : null}
          <Button
            data-tour="new-group"
            className="ml-auto hidden rounded-full md:inline-flex"
            onClick={() => setOpen(true)}
          >
            <Plus className="size-4" /> New group
          </Button>
        </div>
      </section>

      <section className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {isLoading ? (
          <>
            <Skeleton className="h-40 rounded-[22px]" />
            <Skeleton className="h-40 rounded-[22px]" />
          </>
        ) : groups && groups.length > 0 ? (
          groups.map((g) => <GroupCard key={g.id} group={g} />)
        ) : (
          <div className="rounded-[22px] glass p-6 text-center md:col-span-2 xl:col-span-3">
            <p className="font-display text-lg font-semibold">No active groups</p>
            <p className="mx-auto mt-1 max-w-[38ch] text-sm text-muted-foreground">
              Start one for your next project and add the friends you are working with.
            </p>
            <Button className="mt-4 rounded-full" onClick={() => setOpen(true)}>
              <Plus className="size-4" /> New group
            </Button>
          </div>
        )}
      </section>

      <div className="mt-4 rounded-[20px] glass quiet-pulse p-4 md:max-w-2xl">
        <div className="flex items-center gap-3">
          <div className="grid size-9 shrink-0 place-items-center rounded-full glass-inset font-display text-sm font-semibold text-muted-foreground">
            21
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-medium">Older groups clear themselves.</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              No tasks or notes for 30 days — or 14 days past the deadline — and a group leaves this list, then gets deleted for good.
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="New group"
        data-tour="new-group"
        className="fixed bottom-28 right-5 z-30 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-float transition active:scale-95 md:hidden"
      >
        <Plus className="size-6" />
      </button>

      <CreateGroupSheet open={open} onOpenChange={setOpen} />
    </AppShell>
  );
}
