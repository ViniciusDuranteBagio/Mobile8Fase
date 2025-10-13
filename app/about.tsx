import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function AboutScreen() {
    return (
        <ThemedView >
            <ThemedView >
                <ThemedText type="title">Sobre</ThemedText>
                <ThemedText type="subtitle">Aqui você pode ajustar suas preferências</ThemedText>
            </ThemedView>
        </ThemedView>
    )
}