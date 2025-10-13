import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function ProfileScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F3D9FA', dark: '#422940' }}
      headerImage={
        <IconSymbol
          size={210}
          name="person.crop.circle.fill"
          color="#B095C5"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Perfil</ThemedText>
        <ThemedText>Veja suas informações básicas e preferências.</ThemedText>
      </ThemedView>
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Informações</ThemedText>
        <ThemedText>Nome: Renato Bonetti Neto</ThemedText>
        <ThemedText>Idade: 22 anos</ThemedText>
      </ThemedView>
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Preferências</ThemedText>
        <ThemedText>Temas: Automático</ThemedText>
        <ThemedText>Notificações: Ativadas</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    position: 'absolute',
    bottom: -40,
    right: -40,
  },
  titleContainer: {
    gap: 8,
    marginBottom: 16,
  },
  section: {
    gap: 4,
    marginBottom: 16,
  },
});
