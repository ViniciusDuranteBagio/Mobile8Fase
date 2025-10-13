import { router } from "expo-router";
import { Info } from "lucide-react";
import * as React from "react";
import { TouchableOpacity } from "react-native";
import { ThemedText } from "./themed-text";

export default function AboutButton() {
  return (
    <TouchableOpacity
      onPress={() => router.push("/about")}
      style={{
        display: "flex",
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Info
        size={20}
        style={{
          color: "#FFFFFF",
        }}
      />
      <ThemedText>Sobre</ThemedText>
    </TouchableOpacity>
  );
}
