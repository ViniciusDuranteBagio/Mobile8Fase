import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import * as Haptics from 'expo-haptics';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function AboutButton() {
  const colorScheme = useColorScheme();
  
  const handlePress = () => {
    // Adiciona feedback háptico quando o botão for pressionado
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <Link href="/about" asChild>
      <Pressable 
        style={[
          styles.button, 
          { backgroundColor: Colors[colorScheme ?? 'light'].tint }
        ]}
        onPress={handlePress}
      >
        <ThemedView style={styles.buttonContent}>
          <IconSymbol 
            name="info.circle.fill" 
            size={24} 
            color="white" 
          />
          <ThemedText style={styles.buttonText}>
            Sobre o App
          </ThemedText>
        </ThemedView>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)',
    elevation: 5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});