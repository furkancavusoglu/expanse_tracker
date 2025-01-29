import React, { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../lib/store/auth";
import { Screen } from "../../components/Screen";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { common, layout } from "../../lib/constants/styles";

export default function ForgotPasswordScreen() {
  // Form state
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Navigation and auth
  const router = useRouter();
  const { resetPassword } = useAuthStore();

  // Handle reset password
  const handleResetPassword = async () => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { error } = await resetPassword(email);
      if (error) throw error;
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen
      title="Reset Password"
      error={error || undefined}
      success={
        success
          ? "Password reset instructions have been sent to your email."
          : undefined
      }
    >
      {success ? (
        <View className={common.formContainer}>
          <Button
            title="Return to Sign In"
            onPress={() => router.replace("/sign-in")}
          />
        </View>
      ) : (
        <View className={common.formContainer}>
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <View className={layout.verticalGap.large}>
            <Button
              title="Send Reset Instructions"
              onPress={handleResetPassword}
              loading={loading}
              loadingText="Sending instructions..."
            />
          </View>
        </View>
      )}

      {!success && (
        <View className={layout.verticalGap.xxlarge}>
          <Button
            title="Back to Sign In"
            onPress={() => router.push("/sign-in")}
            variant="link"
          />
        </View>
      )}
    </Screen>
  );
}
