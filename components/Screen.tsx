import React from "react";
import { View, Text } from "react-native";
import { common, layout, typography } from "../lib/constants/styles";

interface ScreenProps {
  children: React.ReactNode;
  title?: string;
  error?: string;
  success?: string;
}

export function Screen({ children, title, error, success }: ScreenProps) {
  return (
    <View className={common.screenContainer}>
      {/* Header */}
      {(title || error || success) && (
        <View className={layout.headerSpacing}>
          {title && <Text className={common.header}>{title}</Text>}
          {error && <Text className={typography.error}>{error}</Text>}
          {success && <Text className={typography.success}>{success}</Text>}
        </View>
      )}

      {children}
    </View>
  );
}
