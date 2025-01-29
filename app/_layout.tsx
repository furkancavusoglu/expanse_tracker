import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(auth)",
};
