import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter, Link } from "expo-router";
import { useAuth } from "../../lib/context/auth";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { signUp } = useAuth();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { error } = await signUp(email, password);
      if (error) throw error;
      // Show success message and redirect to sign in
      router.replace(
        "/sign-in?message=Please check your email to confirm your account"
      );
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
          Create Account
        </Text>

        {error && (
          <Text className="text-red-500 text-center mb-4">{error}</Text>
        )}

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

        <View className="space-y-2">
          <Text className="text-gray-600">Password</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View className="space-y-2">
          <Text className="text-gray-600">Confirm Password</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          className="bg-black py-3 rounded-lg"
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center font-semibold">
              Sign Up
            </Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center space-x-1">
          <Text className="text-gray-600">Already have an account?</Text>
          <Link href="/sign-in" className="text-black font-semibold">
            Sign In
          </Link>
        </View>
      </View>
    </View>
  );
}
