import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Ban, Check, Search, UserMinus, X } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/hub/AppShell";
import { HelpHint } from "@/components/hub/HelpHint";
import { UserAvatar } from "@/components/hub/UserAvatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import {
  blockUser,
  listBlocks,
  listFriendEdges,
  removeFriendship,
  respondToRequest,
  searchUsers,
  sendFriendRequest,
  unblockUser,
} from "@/lib/hub-api";

export const Route = createFileRoute("/_authenticated/friends")({
  head: () => ({
    meta: [
      { title: "Friends — Hub" },
      {
        name: "description",
        content:
          "Add classmates, accept requests, and manage who can reach you.",
      },
      { property: "og:title", content: "Friends — Hub" },
      {
        property: "og:description",
        content: "Your Hub friend list: requests, removals and blocks.",
      },
    ],
  }),
  component: FriendsPage,
});

function PersonRow({
  name,
  school,
  avatar,
  children,
}: {
  name: string;
  school?: string | null | undefined;
  avatar?: string | null | undefined;
  children?: React.ReactNode | undefined;
}) {
  return (
    <div className="flex items-center gap-3 rounded-[18px] glass p-3">
      <UserAvatar name={name} url={avatar} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{name}</p>
        {school ? (
          <p className="truncate text-[11px] text-muted-foreground">{school}</p>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center gap-1.5">{children}</div>
    </div>
  );
}

function FriendsPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [query, setQuery] = useState("");

  const edges = useQuery({
    queryKey: ["friend-edges", user?.id],
    enabled: !!user,
    queryFn: () => listFriendEdges(user!.id),
  });
  const blocks = useQuery({ queryKey: ["blocks"], queryFn: listBlocks });
  const results = useQuery({
    queryKey: ["search-users", query],
    enabled: query.trim().length >= 2,
    queryFn: () => searchUsers(query),
  });

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ["friend-edges"] });
    queryClient.invalidateQueries({ queryKey: ["search-users"] });
    queryClient.invalidateQueries({ queryKey: ["blocks"] });
    queryClient.invalidateQueries({ queryKey: ["unread-count"] });
  };

  const friends = useMemo(
    () => (edges.data ?? []).filter((e) => e.status === "accepted"),
    [edges.data],
  );
  const incoming = useMemo(
    () =>
      (edges.data ?? []).filter(
        (e) => e.status === "pending" && e.direction === "incoming",
      ),
    [edges.data],
  );
  const outgoing = useMemo(
    () =>
      (edges.data ?? []).filter(
        (e) => e.status === "pending" && e.direction === "outgoing",
      ),
    [edges.data],
  );

  const request = useMutation({
    mutationFn: (targetId: string) => sendFriendRequest(user!.id, targetId),
    onSuccess: () => {
      refresh();
      toast.success("Request sent.");
    },
    onError: () => toast.error("Couldn't send that request."),
  });
  const respond = useMutation({
    mutationFn: ({ id, accept }: { id: string; accept: boolean }) =>
      respondToRequest(id, accept),
    onSuccess: refresh,
    onError: (e: Error) => toast.error(e.message),
  });
  const unfriend = useMutation({
    mutationFn: (id: string) => removeFriendship(id),
    onSuccess: () => {
      refresh();
      toast.success("Removed.");
    },
    onError: (e: Error) => toast.error(e.message),
  });
  const block = useMutation({
    mutationFn: (targetId: string) => blockUser(user!.id, targetId),
    onSuccess: () => {
      refresh();
      toast.success("Blocked. They can't reach you or share a group with you.");
    },
    onError: (e: Error) => toast.error(e.message),
  });
  const unblock = useMutation({
    mutationFn: (id: string) => unblockUser(id),
    onSuccess: refresh,
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <AppShell>
      <section className="glass rounded-[22px] p-5 shadow-panel">
        <div className="flex items-start gap-2">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Friends
            </p>
            <h1 className="mt-1 font-display text-[26px] font-semibold leading-tight">
              Who you can work with
            </h1>
          </div>
          <HelpHint
            className="ml-auto"
            title="Adding friends"
            points={[
              "Type at least two letters of a name or school to search.",
              "Send a request — they appear in your list once they accept.",
              "Unfriending only removes the link; blocking also stops their requests and keeps them out of your groups.",
            ]}
          />
        </div>
        <p className="mt-1.5 text-[13px] text-muted-foreground">
          Groups can only be built from this list, so add your classmates first.
        </p>
        <div className="relative mt-4">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or school"
            className="h-12 rounded-2xl pl-11"
          />
        </div>
      </section>

      {query.trim().length >= 2 ? (
        <section className="mt-4 space-y-2">
          <h2 className="px-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Search results
          </h2>
          {results.isLoading ? (
            <Skeleton className="h-16 rounded-[18px]" />
          ) : results.data && results.data.length > 0 ? (
            <div className="grid gap-2 md:grid-cols-2">
              {results.data.map((p) => (
                <PersonRow
                  key={p.id}
                  name={p.display_name}
                  school={p.school}
                  avatar={p.avatar_url}
                >
                  {p.link_status === "none" ? (
                    <Button
                      size="sm"
                      className="rounded-full"
                      onClick={() => request.mutate(p.id)}
                      disabled={request.isPending}
                    >
                      Add
                    </Button>
                  ) : (
                    <span className="rounded-full bg-muted px-3 py-1 text-[11px] font-medium text-muted-foreground">
                      {p.link_status === "friends"
                        ? "Friends"
                        : p.link_status === "sent"
                          ? "Requested"
                          : "Wants to add you"}
                    </span>
                  )}
                </PersonRow>
              ))}
            </div>
          ) : (
            <p className="rounded-[18px] glass p-4 text-sm text-muted-foreground">
              Nobody found. They need a Hub account and a finished profile.
            </p>
          )}
        </section>
      ) : null}

      <Tabs defaultValue="friends" className="mt-5">
        <TabsList className="grid w-full grid-cols-3 rounded-2xl glass-inset p-1 md:w-auto md:grid-cols-none md:auto-cols-max md:grid-flow-col">
          <TabsTrigger value="friends" className="rounded-xl">
            Friends {friends.length ? `(${friends.length})` : ""}
          </TabsTrigger>
          <TabsTrigger value="requests" className="rounded-xl">
            Requests {incoming.length ? `(${incoming.length})` : ""}
          </TabsTrigger>
          <TabsTrigger value="blocked" className="rounded-xl">
            Blocked
          </TabsTrigger>
        </TabsList>

        <TabsContent value="friends" className="mt-3 space-y-2">
          {edges.isLoading ? (
            <Skeleton className="h-16 rounded-[18px]" />
          ) : friends.length > 0 ? (
            <div className="grid gap-2 md:grid-cols-2">
              {friends.map((f) => (
                <PersonRow
                  key={f.id}
                  name={f.other.display_name}
                  school={f.other.school}
                  avatar={f.other.avatar_url}
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full"
                    aria-label="Remove friend"
                    onClick={() => unfriend.mutate(f.id)}
                  >
                    <UserMinus className="size-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                    aria-label="Block user"
                    onClick={() => block.mutate(f.other.id)}
                  >
                    <Ban className="size-4" />
                  </Button>
                </PersonRow>
              ))}
            </div>
          ) : (
            <p className="rounded-[18px] glass p-4 text-sm text-muted-foreground">
              No friends yet. Search above to add classmates.
            </p>
          )}
        </TabsContent>

        <TabsContent value="requests" className="mt-3 space-y-4">
          <div className="space-y-2">
            <h3 className="px-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Received
            </h3>
            {incoming.length > 0 ? (
              incoming.map((f) => (
                <PersonRow
                  key={f.id}
                  name={f.other.display_name}
                  school={f.other.school}
                  avatar={f.other.avatar_url}
                >
                  <Button
                    size="icon"
                    className="rounded-full"
                    aria-label="Accept"
                    onClick={() => respond.mutate({ id: f.id, accept: true })}
                  >
                    <Check className="size-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full"
                    aria-label="Decline"
                    onClick={() => respond.mutate({ id: f.id, accept: false })}
                  >
                    <X className="size-4" />
                  </Button>
                </PersonRow>
              ))
            ) : (
              <p className="rounded-[18px] glass p-4 text-sm text-muted-foreground">
                No pending requests.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="px-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Sent
            </h3>
            {outgoing.length > 0 ? (
              outgoing.map((f) => (
                <PersonRow
                  key={f.id}
                  name={f.other.display_name}
                  school={f.other.school}
                  avatar={f.other.avatar_url}
                >
                  <Button
                    size="sm"
                    variant="ghost"
                    className="rounded-full"
                    onClick={() => unfriend.mutate(f.id)}
                  >
                    Cancel
                  </Button>
                </PersonRow>
              ))
            ) : (
              <p className="rounded-[18px] glass p-4 text-sm text-muted-foreground">
                Nothing waiting.
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="blocked" className="mt-3 space-y-2">
          {blocks.data && blocks.data.length > 0 ? (
            blocks.data.map((b) => (
              <PersonRow
                key={b.id}
                name={b.profile?.display_name ?? "Blocked user"}
                school={b.profile?.school}
                avatar={b.profile?.avatar_url}
              >
                <Button
                  size="sm"
                  variant="ghost"
                  className="rounded-full"
                  onClick={() => unblock.mutate(b.id)}
                >
                  Unblock
                </Button>
              </PersonRow>
            ))
          ) : (
            <p className="rounded-[18px] glass p-4 text-sm text-muted-foreground">
              Nobody blocked.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
