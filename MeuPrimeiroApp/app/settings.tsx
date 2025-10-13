import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function Settings() {
  return (
    <ThemedView>
      <ThemedView>
        <ThemedText type="title">Configurações</ThemedText>
        <ThemedText>Personalize sua experiência</ThemedText>
      </ThemedView>

      <ThemedView>
        <ThemedText>
          Dica: O tema é detectado automaticamente baseado nas configurações de
          seu dipositivo
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}
