import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Sobre</ThemedText>
      <ThemedText style={styles.text}>
        App criado com React Native + Expo Router.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 12 },
  text: { fontSize: 16, opacity: 0.8, lineHeight: 22 },
});
