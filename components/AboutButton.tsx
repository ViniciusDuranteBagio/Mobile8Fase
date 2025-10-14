import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ThemedText } from '@/components/themed-text';
import { router } from 'expo-router';

type Props = {
  /** Rota de destino ao clicar */
  to?: string;
  /** Texto exibido ao lado do ícone */
  label?: string;
  /** Cor do ícone */
  color?: string;
  /** Tamanho do ícone */
  size?: number;
  /** Estilo adicional opcional */
  style?: ViewStyle;
};

/**
 * Componente reutilizável de botão "Sobre"
 */
export function AboutButton({
  to = '/about',
  label = 'Sobre o usuário',
  color = '#007AFF',
  size = 32,
  style,
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => router.push(to)}
    >
      <IconSymbol name="person.circle" size={size} color={color} />
      <ThemedText type="link">{label}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
});
