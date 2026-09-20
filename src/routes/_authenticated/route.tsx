import {
  createFileRoute,
  Outlet,
  redirect,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect } from "react";

import { useProfile } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/" });
    return { user: data.user };
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { data: profile, isLoading } = useProfile();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    const needsOnboarding = !profile?.onboarded;
    if (needsOnboarding && pathname !== "/onboarding") {
      navigate({ to: "/onboarding", replace: true });
    }
    if (!needsOnboarding && pathname === "/onboarding") {
      navigate({ to: "/groups", replace: true });
    }
  }, [isLoading, profile?.onboarded, pathname, navigate]);

  return <Outlet />;
}
