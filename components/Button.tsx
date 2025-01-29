import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native";
import { buttons } from "../lib/constants/styles";

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  loadingText?: string;
  variant?: "primary" | "link";
  className?: string;
}

export function Button({
  title,
  onPress,
  loading,
  loadingText,
  variant = "primary",
  className,
}: ButtonProps) {
  const isLink = variant === "link";

  const renderLinkText = (text: string) => {
    const signInIndex = text.indexOf("Sign In");
    const signUpIndex = text.indexOf("Sign Up");

    if (signInIndex !== -1) {
      const before = text.substring(0, signInIndex);
      return (
        <Text className="text-black text-center text-base">
          {before}
          <Text className="font-semibold">Sign In</Text>
        </Text>
      );
    }

    if (signUpIndex !== -1) {
      const before = text.substring(0, signUpIndex);
      return (
        <Text className="text-black text-center text-base">
          {before}
          <Text className="font-semibold">Sign Up</Text>
        </Text>
      );
    }

    return <Text className="text-black text-center text-base">{text}</Text>;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.7}
      className={`${
        isLink
          ? "self-center px-3 py-2 rounded-md active:bg-gray-100"
          : "w-full bg-black py-4 rounded-lg active:opacity-70"
      } ${loading ? "opacity-70" : ""} ${className || ""}`}
    >
      <View className="flex-row justify-center items-center">
        {loading && (
          <ActivityIndicator
            color={isLink ? "black" : "white"}
            size="small"
            className="mr-2"
          />
        )}
        {isLink ? (
          renderLinkText(loading ? loadingText || "Loading..." : title)
        ) : (
          <Text className="text-white text-center font-semibold text-base">
            {loading ? loadingText || "Loading..." : title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
