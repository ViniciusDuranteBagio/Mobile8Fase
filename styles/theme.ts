/**
 * Camada de Estilos - Theme
 * Design moderno escuro e minimalista
 */

import { StyleSheet } from 'react-native';

export const colors = {
  // Paleta escura minimalista
  background: '#0A0A0A',
  surface: '#1A1A1A',
  surfaceLight: '#252525',
  primary: '#FFFFFF',
  secondary: '#888888',
  accent: '#666666',
  border: '#2A2A2A',
  success: '#4CAF50',
  error: '#F44336',
  text: {
    primary: '#FFFFFF',
    secondary: '#B0B0B0',
    tertiary: '#707070',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  xxxl: 40,
};

export const fontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 22,
  xxl: 28,
  xxxl: 36,
};

export const commonStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: '300',
    color: colors.text.primary,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    marginTop: spacing.md,
    lineHeight: 20,
    fontWeight: '300',
  },
});
