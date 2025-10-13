import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

export default function AboutButton() {
  return (
    <Link href="/about" asChild>
      <Pressable>
        <ThemedView style={styles.button}>
          <ThemedText style={styles.label}>Ir para Sobre</ThemedText>
        </ThemedView>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  label: { textAlign: 'center', fontSize: 16, fontWeight: '600' },
});
