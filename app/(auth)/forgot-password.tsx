import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter, Link } from "expo-router";
import { useAuthStore } from "../../lib/store/auth";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { resetPassword } = useAuthStore();

  const handleResetPassword = async () => {
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
    <View className="flex-1 justify-center px-4 bg-white">
      <View className="space-y-4">
        <Text className="text-2xl font-bold text-center mb-8">
          Reset Password
        </Text>

        {error && (
          <Text className="text-red-500 text-center mb-4">{error}</Text>
        )}

        {success ? (
          <View className="space-y-4">
            <Text className="text-green-500 text-center">
              Password reset instructions have been sent to your email.
            </Text>
            <TouchableOpacity
              className="bg-black py-3 rounded-lg"
              onPress={() => router.replace("/sign-in")}
            >
              <Text className="text-white text-center font-semibold">
                Return to Sign In
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View className="space-y-2">
              <Text className="text-gray-600">Email</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <TouchableOpacity
              className="bg-black py-3 rounded-lg"
              onPress={handleResetPassword}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white text-center font-semibold">
                  Send Reset Instructions
                </Text>
              )}
            </TouchableOpacity>
          </>
        )}

        <Link href="/sign-in" className="text-black text-center">
          Back to Sign In
        </Link>
      </View>
    </View>
  );
}
