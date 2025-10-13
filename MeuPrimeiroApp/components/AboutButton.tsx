import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { ThemedText } from "./themed-text";

export default function aboutButton() {
  return (
    <TouchableOpacity onPress={() => router.push("/about")}>
      <ThemedText>Sobre</ThemedText>
    </TouchableOpacity>
  );
}
