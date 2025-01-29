import { useEffect } from "react";
import { Text, View, Platform } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { supabase } from "../../lib/supabase";

export default function AuthCallback() {
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    // Handle the authentication callback
    const handleAuth = async () => {
      if (Platform.OS === "web") {
        // For web, handle the hash fragment
        const hash = window.location.hash;
        if (hash) {
          const params = new URLSearchParams(hash.substring(1));
          const access_token = params.get("access_token");
          const refresh_token = params.get("refresh_token");

          if (access_token && refresh_token) {
            const { error } = await supabase.auth.setSession({
              access_token,
              refresh_token,
            });

            if (!error) {
              router.replace("/(app)");
            }
          }
        }
      } else {
        // For mobile, handle the params directly
        const { access_token, refresh_token } = params;

        if (access_token && refresh_token) {
          const { error } = await supabase.auth.setSession({
            access_token: access_token as string,
            refresh_token: refresh_token as string,
          });

          if (!error) {
            router.replace("/(app)");
          }
        }
      }
    };

    handleAuth();
  }, [params]);

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Completing sign in...</Text>
    </View>
  );
}
