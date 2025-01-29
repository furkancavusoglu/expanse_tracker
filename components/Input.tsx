import React from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";
import { typography, inputs, common } from "../lib/constants/styles";

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
}

export function Input({ label, error, ...props }: InputProps) {
  return (
    <View className={common.inputGroup}>
      <Text className={typography.label}>{label}</Text>
      <TextInput className={inputs.textInput} {...props} />
      {error && <Text className={typography.error}>{error}</Text>}
    </View>
  );
}
