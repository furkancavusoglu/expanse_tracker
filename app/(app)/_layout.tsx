import { Stack } from "expo-router";
import { useAuthStore } from "../../lib/store/auth";
import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";

export default function AppLayout() {
  // Auth state
  const { user, loading } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  // Auth navigation effect
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
        contentStyle: {
          backgroundColor: "white",
        },
      }}
    />
  );
}
