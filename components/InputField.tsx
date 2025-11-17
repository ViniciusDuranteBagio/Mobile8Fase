/**
 * Componente reutilizável - InputField
 */

import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, fontSize, spacing } from '../styles/theme';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  editable?: boolean;
}

export default function InputField({ label, value, onChangeText, placeholder, editable = true }: InputFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.text.tertiary}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: '400',
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    letterSpacing: 0.3,
  },
  input: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: 8,
    fontSize: fontSize.md,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text.primary,
  },
});
