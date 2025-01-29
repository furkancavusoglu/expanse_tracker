import React, { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../lib/store/auth";
import { Screen } from "../../components/Screen";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { common, layout } from "../../lib/constants/styles";

export default function SignUpScreen() {
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Navigation and auth
  const router = useRouter();
  const { signUp } = useAuthStore();

  // Handle sign up
  const handleSignUp = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { error: signUpError } = await signUp(email, password);

      if (signUpError) throw signUpError;

      router.replace(
        "/sign-in?message=Please verify your email before signing in"
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen title="Create Account" error={error || undefined}>
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
            title="Sign Up"
            onPress={handleSignUp}
            loading={loading}
            loadingText="Creating account..."
          />
        </View>
      </View>

      <View className={layout.verticalGap.xxlarge}>
        <Button
          title="Already have an account? Sign In"
          onPress={() => router.push("/sign-in")}
          variant="link"
        />
      </View>
    </Screen>
  );
}
