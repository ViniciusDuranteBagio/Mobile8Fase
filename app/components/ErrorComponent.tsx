import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ErrorComponentProps {
  error: string | null;
}

export const ErrorComponent: React.FC<ErrorComponentProps> = ({ error }) => {
  if (!error) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>⚠️ {error}</Text>
      <Text style={styles.subText}>Erro ao carregar dados…</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFE5E5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF3B30',
  },
  errorText: {
    fontSize: 14,
    color: '#C41E3A',
    fontWeight: '600',
    marginBottom: 4,
  },
  subText: {
    fontSize: 12,
    color: '#A01E2E',
  },
});
