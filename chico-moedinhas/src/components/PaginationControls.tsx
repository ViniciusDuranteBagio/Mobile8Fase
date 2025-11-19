/**
 * Componente de controles de paginação
 */

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: PaginationControlsProps) {
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isPrevDisabled && styles.buttonDisabled]}
        onPress={onPrevious}
        disabled={isPrevDisabled}
      >
        <Text style={[styles.buttonText, isPrevDisabled && styles.buttonTextDisabled]}>
          ← Anterior
        </Text>
      </TouchableOpacity>

      <View style={styles.pageInfo}>
        <Text style={styles.pageText}>
          Página {currentPage} de {totalPages}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, isNextDisabled && styles.buttonDisabled]}
        onPress={onNext}
        disabled={isNextDisabled}
      >
        <Text style={[styles.buttonText, isNextDisabled && styles.buttonTextDisabled]}>
          Próxima →
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.surfaceLight,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  button: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SPACING.xs,
  },
  buttonDisabled: {
    backgroundColor: COLORS.border,
    opacity: 0.5,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 12,
  },
  buttonTextDisabled: {
    color: COLORS.textSecondary,
  },
  pageInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },
});
