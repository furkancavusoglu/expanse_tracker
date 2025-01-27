import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../../lib/context/auth";

export default function HomeScreen() {
  const { signOut } = useAuth();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold mb-8">
        Welcome to Expense Tracker
      </Text>
      <TouchableOpacity
        className="bg-black py-3 px-6 rounded-lg"
        onPress={() => signOut()}
      >
        <Text className="text-white font-semibold">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
