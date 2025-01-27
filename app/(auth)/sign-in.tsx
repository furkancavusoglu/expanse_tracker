import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter, Link, useLocalSearchParams } from "expo-router";
import { useAuth } from "../../lib/context/auth";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { signIn } = useAuth();
  const { message } = useLocalSearchParams<{ message: string }>();

  const handleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await signIn(email, password);
      if (error) throw error;
      router.replace("/(app)");
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
          Welcome Back
        </Text>

        {message && (
          <Text className="text-green-500 text-center mb-4">{message}</Text>
        )}

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

        <TouchableOpacity
          className="bg-black py-3 rounded-lg"
          onPress={handleSignIn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center font-semibold">
              Sign In
            </Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center space-x-1">
          <Text className="text-gray-600">Don't have an account?</Text>
          <Link href="/sign-up" className="text-black font-semibold">
            Sign Up
          </Link>
        </View>

        <Link href="/forgot-password" className="text-black text-center">
          Forgot Password?
        </Link>
      </View>
    </View>
  );
}
