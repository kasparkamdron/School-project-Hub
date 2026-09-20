import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Atmosphere } from "@/components/hub/AppShell";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hub — student group projects that clear themselves" },
      {
        name: "description",
        content:
          "Add friends, start a group, split the tasks. Hub hides any group that goes quiet for 30 days, or 14 days after its deadline passes.",
      },
      { property: "og:title", content: "Hub — student group projects that clear themselves" },
      {
        property: "og:description",
        content: "A temporary coordination tool for student group work: tasks, deadlines and notes, then gone.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && session) navigate({ to: "/groups", replace: true });
  }, [loading, session, navigate]);

  async function signIn() {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setBusy(false);
      toast.error("Sign-in failed. Please try again.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/groups", replace: true });
  }

  return (
    <div className="relative min-h-screen">
      <Atmosphere />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[430px] flex-col px-5 py-8 md:max-w-xl md:justify-center">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-2xl bg-primary font-display text-lg font-bold text-primary-foreground">
            H
          </div>
          <div className="leading-none">
            <p className="font-display text-[17px] font-semibold">Hub</p>
            <p className="mt-1 text-[10px] font-medium text-muted-foreground">Project coordination</p>
          </div>
        </div>

        <section className="glass relative mt-8 overflow-hidden rounded-[26px] p-6 shadow-panel">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Group projects</p>
          <h1 className="mt-2 max-w-[16ch] text-balance font-display text-[34px] font-semibold leading-[1.05] md:text-[44px]">
            The board, wiped clean each term.
          </h1>
          <p className="mt-3 max-w-[40ch] text-pretty text-sm leading-relaxed text-muted-foreground">
            Add classmates as friends, start a group, split the work. A group with no activity for 30 days —
            or one that is 14 days past its deadline — disappears from your list and is deleted shortly after.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-medium">
            <span className="rounded-full glass-inset px-3 py-1.5">Tasks &amp; deadlines</span>
            <span className="rounded-full glass-inset px-3 py-1.5">Shared notes</span>
            <span className="rounded-full glass-inset px-3 py-1.5">21-day auto-clear</span>
          </div>
        </section>

        <div className="mt-6">
          <Button size="lg" className="h-13 w-full rounded-2xl text-base" onClick={signIn} disabled={busy}>
            {busy ? "Opening Google…" : "Continue with Google"}
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Free for students. No files, no chat, no clutter.
          </p>
        </div>
      </div>
    </div>
  );
}
