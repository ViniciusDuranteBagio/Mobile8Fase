/**
 * Componente reutilizável - Button
 */

import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { colors, fontSize, spacing } from '../styles/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  style?: ViewStyle;
}

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  disabled = false,
  style 
}: ButtonProps) {
  const buttonStyle = variant === 'primary' ? styles.primaryButton : styles.secondaryButton;
  const textStyle = variant === 'primary' ? styles.primaryButtonText : styles.secondaryButtonText;
  
  return (
    <TouchableOpacity
      style={[buttonStyle, disabled && styles.disabledButton, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  primaryButtonText: {
    color: colors.text.primary,
    fontSize: fontSize.md,
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    padding: spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryButtonText: {
    color: colors.text.secondary,
    fontSize: fontSize.md,
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  disabledButton: {
    opacity: 0.3,
  },
});
