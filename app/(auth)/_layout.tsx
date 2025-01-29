import { Stack } from "expo-router";
import { useAuthStore } from "../../lib/store/auth";
import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";

export default function AuthLayout() {
  const { user, loading } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // Check if user is authenticated and trying to access auth screens
      if (user && segments[0] === "(auth)") {
        // Redirect to home if trying to access auth screens while logged in
        router.replace("/(app)");
      }
    }
  }, [user, loading, segments]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    />
  );
}
