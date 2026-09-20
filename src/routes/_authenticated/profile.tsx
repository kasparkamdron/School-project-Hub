import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Compass, Download, LogOut, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/hub/AppShell";
import { startTour } from "@/components/hub/TourGuide";
import { UserAvatar } from "@/components/hub/UserAvatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, useProfile } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { deleteMyAccount } from "@/lib/account.functions";
import { exportMyData, saveProfile } from "@/lib/hub-api";
import { THEMES, useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "Your profile — Hub" },
      {
        name: "description",
        content:
          "Edit your name, school and avatar, switch theme, export or delete your data.",
      },
      { property: "og:title", content: "Your profile — Hub" },
      {
        property: "og:description",
        content: "Manage your Hub account, theme and data.",
      },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useAuth();
  const { data: profile } = useProfile();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const removeAccount = useServerFn(deleteMyAccount);

  const [displayName, setDisplayName] = useState("");
  const [school, setSchool] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (!profile) return;
    setDisplayName(profile.display_name ?? "");
    setSchool(profile.school ?? "");
    setAvatarUrl(profile.avatar_url ?? "");
  }, [profile]);

  const save = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Not signed in");
      if (displayName.trim().length < 2)
        throw new Error("Please enter at least 2 characters.");
      await saveProfile({
        id: user.id,
        display_name: displayName,
        school,
        avatar_url: avatarUrl,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile saved.");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const exportData = useMutation({
    mutationFn: exportMyData,
    onSuccess: (data) => {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "hub-my-data.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Your data has been downloaded.");
    },
    onError: () => toast.error("Export failed. Please try again."),
  });

  const wipe = useMutation({
    mutationFn: async () => {
      await removeAccount({ data: undefined });
    },
    onSuccess: async () => {
      await supabase.auth.signOut();
      navigate({ to: "/", replace: true });
      toast.success("Your account and data were deleted.");
    },
    onError: () =>
      toast.error("Couldn't delete the account. Please try again."),
  });

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  }

  return (
    <AppShell>
      <section className="glass rounded-[22px] p-5 shadow-panel">
        <div className="flex items-center gap-4">
          <UserAvatar name={displayName} url={avatarUrl} className="size-14" />
          <div className="min-w-0">
            <h1 className="truncate font-display text-[24px] font-semibold leading-tight">
              {displayName || "Your profile"}
            </h1>
            <p className="truncate text-[13px] text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </div>
      </section>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <section className="glass rounded-[22px] p-5">
          <h2 className="font-display text-lg font-semibold">Details</h2>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="p-name">Display name</Label>
              <Input
                id="p-name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="h-12 rounded-2xl"
                maxLength={60}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="p-school">School</Label>
              <Input
                id="p-school"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="Optional"
                className="h-12 rounded-2xl"
                maxLength={80}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="p-avatar">Avatar image link</Label>
              <Input
                id="p-avatar"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://…"
                className="h-12 rounded-2xl"
              />
            </div>
            <Button
              className="h-12 w-full rounded-2xl"
              onClick={() => save.mutate()}
              disabled={save.isPending}
            >
              {save.isPending ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </section>

        <div className="space-y-5">
          <section className="glass rounded-[22px] p-5">
            <h2 className="font-display text-lg font-semibold">Theme</h2>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Pick the look you prefer.
            </p>
            <div className="mt-4 grid gap-2">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTheme(t.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl p-3 text-left transition",
                    theme === t.id
                      ? "bg-primary/12 ring-1 ring-primary/40"
                      : "glass-inset hover:opacity-90",
                  )}
                >
                  <span
                    className={cn(
                      "size-8 shrink-0 rounded-xl border border-border",
                      t.id === "frost"
                        ? "bg-[oklch(0.946_0.017_267.8)]"
                        : "bg-[oklch(0.183_0.01_234.4)]",
                    )}
                  />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium">{t.label}</span>
                    <span className="block text-[11px] text-muted-foreground">
                      {t.hint}
                    </span>
                  </span>
                  {theme === t.id ? (
                    <span className="ml-auto text-[11px] font-semibold text-primary">
                      Active
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          </section>

          <section className="glass rounded-[22px] p-5">
            <h2 className="font-display text-lg font-semibold">Your data</h2>
            <div className="mt-4 space-y-2">
              <Button
                variant="secondary"
                className="h-12 w-full justify-start rounded-2xl"
                onClick={() => exportData.mutate()}
                disabled={exportData.isPending}
              >
                <Download className="size-4" /> Export my data
              </Button>

              <Button
                variant="secondary"
                className="h-12 w-full justify-start rounded-2xl"
                onClick={() => startTour()}
              >
                <Compass className="size-4" /> Replay the app tour
              </Button>

              <Button
                variant="ghost"
                className="h-12 w-full justify-start rounded-2xl"
                onClick={signOut}
              >
                <LogOut className="size-4" /> Sign out
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-12 w-full justify-start rounded-2xl text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="size-4" /> Delete my account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-3xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete your account?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This removes your profile, friendships, tasks and notes
                      immediately. It cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-full">
                      Keep my account
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      onClick={() => wipe.mutate()}
                    >
                      Delete everything
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
