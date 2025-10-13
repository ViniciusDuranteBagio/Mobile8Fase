import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { ThemedText } from "./themed-text";

export function AboutButton() {
    return (
        <TouchableOpacity onPress={() => router.push('/about')}>
            <ThemedText type="link">Sobre</ThemedText>
        </TouchableOpacity>
    )
}