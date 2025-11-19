/**
 * Componente de cartão exibindo informações de uma moeda
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Currency } from '../types/currency';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { formatCurrency, formatVariation, formatDecimal } from '../utils/formatters';

interface CurrencyCardProps {
  currency: Currency;
}

export function CurrencyCard({ currency }: CurrencyCardProps) {
  // Determina a cor baseado na variação
  const variationValue = parseFloat(currency.pctChange || '0');
  const variationColor = variationValue >= 0 ? COLORS.success : COLORS.error;

  return (
    <View style={styles.card}>
      {/* Header: Código e Nome */}
      <View style={styles.header}>
        <View>
          <Text style={styles.code}>{currency.code}</Text>
          <Text style={styles.name}>{currency.name}</Text>
        </View>
        <Text style={[styles.variation, { color: variationColor }]}>
          {formatVariation(currency.pctChange)}
        </Text>
      </View>

      {/* Divisor */}
      <View style={styles.divider} />

      {/* Valores */}
      <View style={styles.valuesContainer}>
        <View style={styles.valueRow}>
          <Text style={styles.label}>Compra</Text>
          <Text style={styles.value}>{formatCurrency(currency.bid)}</Text>
        </View>
        <View style={styles.valueRow}>
          <Text style={styles.label}>Venda</Text>
          <Text style={styles.value}>{formatCurrency(currency.ask)}</Text>
        </View>
      </View>

      {/* Footer: Máxima e Mínima */}
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Text style={styles.footerLabel}>Máxima</Text>
          <Text style={styles.footerValue}>{formatCurrency(currency.high)}</Text>
        </View>
        <View style={styles.footerItem}>
          <Text style={styles.footerLabel}>Mínima</Text>
          <Text style={styles.footerValue}>{formatCurrency(currency.low)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  code: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  name: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  variation: {
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
  },
  valuesContainer: {
    marginBottom: SPACING.sm,
  },
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  label: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.xs,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.md,
    marginHorizontal: SPACING.xs,
  },
  footerLabel: {
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  footerValue: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    marginTop: SPACING.xs,
  },
});
