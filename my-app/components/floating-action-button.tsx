import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface FloatingActionButtonProps {
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  label?: string;
  color?: string;
}

export function FloatingActionButton({ 
  onPress, 
  icon = 'add', 
  label,
  color = '#007AFF' 
}: FloatingActionButtonProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <TouchableOpacity
      style={[styles.fab, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons name={icon} size={24} color="white" />
      {label && (
        <ThemedText style={styles.fabLabel}>{label}</ThemedText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  fabLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});