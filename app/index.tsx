import { Redirect } from "expo-router";
import { useAuthStore } from "../lib/store/auth";
import { useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Index() {
  const { user, loading, setUser, setSession, setLoading } = useAuthStore();

  useEffect(() => {
    // Check active sessions and subscribe to auth changes
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // While loading, don't render anything
  if (loading) return null;

  // If user is not authenticated, redirect to sign in
  if (!user) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  // If user is authenticated, redirect to app home
  return <Redirect href="/(app)" />;
}
