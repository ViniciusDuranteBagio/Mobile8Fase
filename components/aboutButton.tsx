import { Pressable, StyleSheet } from 'react-native';

import { Link } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type AboutButtonProps = {
  title?: string;
};

export function AboutButton({ title = 'Sobre' }: AboutButtonProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const backgroundColor = colorScheme === 'dark' ? '#1E1F2B' : '#E8EBFF';

  return (
    <Link href="/about" asChild>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor, borderColor: theme.tint },
          pressed && styles.pressed,
        ]}>
        <ThemedView style={styles.content}>
          <IconSymbol name="chevron.right" size={20} color={theme.tint} />
          <ThemedText type="subtitle">{title}</ThemedText>
        </ThemedView>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 12,
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.7,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
});
