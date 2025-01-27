import { Stack } from "expo-router";
import { AuthProvider } from "../lib/context/auth";
import "../global.css";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(auth)",
};
