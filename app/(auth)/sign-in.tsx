import React, { useState } from "react";
import { View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAuthStore } from "../../lib/store/auth";
import { Screen } from "../../components/Screen";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { common, layout } from "../../lib/constants/styles";

export default function SignInScreen() {
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Navigation and auth
  const router = useRouter();
  const { signIn } = useAuthStore();
  const { message } = useLocalSearchParams<{ message: string }>();

  // Handle sign in
  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { error: signInError, data } = await signIn(email, password);

      if (signInError) throw signInError;

      if (data.session) {
        router.replace("/(app)");
      } else {
        setError("Failed to sign in. Please try again.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen title="Welcome Back" error={error || undefined} success={message}>
      <View className={common.formContainer}>
        <Input
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View className={layout.verticalGap.large}>
          <Button
            title="Sign In"
            onPress={handleSignIn}
            loading={loading}
            loadingText="Signing in..."
          />
        </View>
      </View>

      <View className={layout.verticalGap.xxlarge}>
        <View className={common.formContainer}>
          <Button
            title="Don't have an account? Sign Up"
            onPress={() => router.push("/sign-up")}
            variant="link"
          />

          <Button
            title="Forgot Password?"
            onPress={() => router.push("/forgot-password")}
            variant="link"
          />
        </View>
      </View>
    </Screen>
  );
}
