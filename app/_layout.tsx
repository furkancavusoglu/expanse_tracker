import { Stack } from "expo-router";
import "../global.css";
import { useEffect } from "react";
import { useAuthStore } from "../lib/store/auth";

export default function RootLayout() {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return <Stack screenOptions={{ headerShown: false }} />;
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(auth)",
};
