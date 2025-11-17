/**
 * Tela - Home
 * Tela inicial com design minimalista
 */

import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import { colors, commonStyles, fontSize, spacing } from '../styles/theme';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <View style={commonStyles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>KMCULATOR</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.icon}>—</Text>
          <Text style={styles.title}>Distância entre Cidades</Text>
          <Text style={styles.subtitle}>
            Calcule distâncias geográficas entre cidades brasileiras usando coordenadas precisas
          </Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Calcular distância"
            onPress={() => onNavigate('calcular')}
            variant="primary"
          />
          
          <Button
            title="Ver histórico"
            onPress={() => onNavigate('historico')}
            variant="secondary"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  appName: {
    fontSize: fontSize.md,
    fontWeight: '400',
    color: colors.text.primary,
    letterSpacing: 3,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxxl,
    justifyContent: 'space-between',
  },
  titleContainer: {
    marginTop: spacing.xxxl,
  },
  icon: {
    fontSize: fontSize.xxxl,
    color: colors.text.primary,
    marginBottom: spacing.xl,
    fontWeight: '100',
  },
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: '200',
    color: colors.text.primary,
    letterSpacing: -0.5,
    lineHeight: 42,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    marginTop: spacing.xl,
    lineHeight: 22,
    fontWeight: '300',
  },
  buttonContainer: {
    marginBottom: spacing.xl,
  },
});
