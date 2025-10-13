import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function SettingsScreen() {
    return (
        <ThemedView >
            <ThemedView >
                <ThemedText type="title">Configurações</ThemedText>
                <ThemedText type="subtitle">Aqui você pode ajustar suas preferências</ThemedText>
            </ThemedView>
        </ThemedView>
    )
}