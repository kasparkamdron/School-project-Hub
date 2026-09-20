import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { Atmosphere } from "@/components/hub/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, useProfile } from "@/hooks/useAuth";
import { saveProfile } from "@/lib/hub-api";

export const Route = createFileRoute("/_authenticated/onboarding")({
  head: () => ({
    meta: [
      { title: "Set up your Hub profile" },
      { name: "description", content: "Tell your group mates who you are before you start coordinating." },
      { property: "og:title", content: "Set up your Hub profile" },
      { property: "og:description", content: "Pick a display name and your school to get started on Hub." },
    ],
  }),
  component: Onboarding,
});

function Onboarding() {
  const { user } = useAuth();
  const { data: profile } = useProfile();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [displayName, setDisplayName] = useState(profile?.display_name ?? "");
  const [school, setSchool] = useState(profile?.school ?? "");

  const save = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Not signed in");
      if (displayName.trim().length < 2) throw new Error("Please enter a name with at least 2 characters.");
      await saveProfile({ id: user.id, display_name: displayName, school, onboarded: true });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      navigate({ to: "/groups", replace: true });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="relative min-h-screen">
      <Atmosphere />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[430px] flex-col justify-center px-5 py-10 md:max-w-lg">
        <div className="glass rounded-[26px] p-6 shadow-panel">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Welcome</p>
          <h1 className="mt-2 font-display text-[28px] font-semibold leading-tight">How should your group see you?</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your name is what friends search for when they add you.
          </p>

          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="display_name">Display name</Label>
              <Input
                id="display_name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Mia Peterson"
                className="h-12 rounded-2xl"
                maxLength={60}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="school">School (optional)</Label>
              <Input
                id="school"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="Tallinn University"
                className="h-12 rounded-2xl"
                maxLength={80}
              />
            </div>
          </div>

          <Button
            className="mt-6 h-13 w-full rounded-2xl text-base"
            onClick={() => save.mutate()}
            disabled={save.isPending}
          >
            {save.isPending ? "Saving…" : "Start using Hub"}
          </Button>
        </div>
      </div>
    </div>
  );
}
