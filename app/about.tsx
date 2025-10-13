import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function AboutScreen() {
  return (
    <ThemedView>
      <ThemedText type='title'>About This App</ThemedText>
      <ThemedText>
        This is a sample app built with Expo and React Navigation.
      </ThemedText>
    </ThemedView>
  );
}
