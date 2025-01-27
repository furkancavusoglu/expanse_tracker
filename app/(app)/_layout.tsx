import { Stack } from "expo-router";
import { useAuth } from "../../lib/context/auth";
import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";

export default function AppLayout() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // Check if user is not authenticated and trying to access app screens
      if (!user && segments[0] === "(app)") {
        // Redirect to sign in if trying to access app screens while not logged in
        router.replace("/(auth)/sign-in");
      }
    }
  }, [user, loading, segments]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
