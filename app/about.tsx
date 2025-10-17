import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Text, View } from "react-native";

export default function About() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemedText>Este é o meu about.</ThemedText>
      <ThemedView>
        <ThemedText> Este é um themeText dentro de um Themed View</ThemedText>
      </ThemedView>
    </View>
  );
}
