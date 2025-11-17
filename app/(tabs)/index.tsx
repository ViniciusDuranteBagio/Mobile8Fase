import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ThemedView style={{ padding: 20 }}>
      <ThemedText type="title" style={{ marginBottom: 10 }}>
        Pokédex
      </ThemedText>

      <ThemedText>
        Aqui você verá a lista de Pokémons carregada da API.
      </ThemedText>
    </ThemedView>
  );
}