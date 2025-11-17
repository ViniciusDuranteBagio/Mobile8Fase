/**
 * Componente reutilizável - Card
 */

import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, spacing } from '../styles/theme';

interface CardProps {
  origem: string;
  destino: string;
  distancia: string;
  data: string;
}

export default function Card({ origem, destino, distancia, data }: CardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardDate}>{data}</Text>
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.infoRow}>
          <Text style={styles.cardLabel}>ORIGEM</Text>
          <Text style={styles.cardText} numberOfLines={2}>{origem}</Text>
        </View>
        
        <View style={styles.separator} />
        
        <View style={styles.infoRow}>
          <Text style={styles.cardLabel}>DESTINO</Text>
          <Text style={styles.cardText} numberOfLines={2}>{destino}</Text>
        </View>
        
        <View style={styles.separator} />
        
        <View style={styles.infoRow}>
          <Text style={styles.cardLabel}>DISTÂNCIA</Text>
          <Text style={styles.cardDistance}>{distancia} km</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    marginBottom: spacing.lg,
  },
  cardDate: {
    fontSize: fontSize.xs,
    color: colors.text.tertiary,
    fontWeight: '300',
  },
  cardContent: {
    gap: spacing.xs,
  },
  infoRow: {
    marginVertical: spacing.sm,
  },
  cardLabel: {
    fontSize: fontSize.xs,
    fontWeight: '400',
    color: colors.text.tertiary,
    marginBottom: spacing.xs,
    letterSpacing: 1,
  },
  cardText: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    lineHeight: 20,
    fontWeight: '300',
  },
  cardDistance: {
    fontSize: fontSize.xl,
    fontWeight: '300',
    color: colors.text.primary,
    letterSpacing: -0.5,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
});
