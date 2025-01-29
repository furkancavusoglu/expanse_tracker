import { View, Text, TouchableOpacity } from "react-native";
import { useAuthStore } from "../../lib/store/auth";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const { signOut } = useAuthStore();
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) {
      router.replace("/(auth)/sign-in");
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold mb-8">
        Welcome to Expense Tracker
      </Text>
      <TouchableOpacity
        className="bg-black py-3 px-6 rounded-lg"
        onPress={handleSignOut}
      >
        <Text className="text-white font-semibold">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
