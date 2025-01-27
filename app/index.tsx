import { Redirect } from "expo-router";
import { useAuth } from "../lib/context/auth";

export default function Index() {
  const { user, loading } = useAuth();

  // While loading, don't render anything
  if (loading) return null;

  // If user is not authenticated, redirect to sign in
  if (!user) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  // If user is authenticated, redirect to app home
  return <Redirect href="/(app)" />;
}
