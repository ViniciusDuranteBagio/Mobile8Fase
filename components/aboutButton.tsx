import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

export function AboutButton() {
  return (
    <ThemedView style={styles.container}>
      <Link href='/about' asChild>
        <ThemedText type='defaultSemiBold' style={styles.button}>
          Go to About
        </ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
