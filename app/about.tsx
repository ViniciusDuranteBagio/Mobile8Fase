import { ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function AboutScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedText type="title" style={styles.title}>
          Sobre o App
        </ThemedText>
        <ThemedText>
          Este aplicativo demonstra a navegação com abas, telas modais e componentes reutilizáveis
          utilizando o Expo Router.
        </ThemedText>
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Funcionalidades</ThemedText>
          <ThemedText>- Navegação em abas.</ThemedText>
          <ThemedText>- Telas empilhadas no Stack.</ThemedText>
          <ThemedText>- Componentes com suporte a temas.</ThemedText>
        </ThemedView>
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Tecnologias</ThemedText>
          <ThemedText>Expo Router, React Native, TypeScript.</ThemedText>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  content: {
    gap: 16,
  },
  title: {
    textAlign: 'center',
  },
  section: {
    gap: 8,
  },
});
