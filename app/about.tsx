import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function AboutScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Sobre o Aplicativo</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Mobile 8ª Fase</ThemedText>
        <ThemedText>
          Este é um aplicativo desenvolvido para a disciplina de Mobile da 8ª fase, 
          utilizando <ThemedText type="defaultSemiBold">React Native</ThemedText> e <ThemedText type="defaultSemiBold">Expo</ThemedText>.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Funcionalidades</ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Navegação por abas</ThemedText> - Sistema de navegação intuitivo
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Componentes temáticos</ThemedText> - Interface adaptável ao tema do sistema
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Feedback háptico</ThemedText> - Resposta tátil nas interações
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Tecnologias Utilizadas</ThemedText>
        <ThemedText>
          • React Native 0.81.4
        </ThemedText>
        <ThemedText>
          • Expo SDK ~54.0.9
        </ThemedText>
        <ThemedText>
          • TypeScript ~5.9.2
        </ThemedText>
        <ThemedText>
          • React Navigation
        </ThemedText>
        <ThemedText>
          • Expo Router
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Desenvolvedor</ThemedText>
        <ThemedText>
          Aplicativo desenvolvido como exercício acadêmico para demonstrar 
          conhecimentos em desenvolvimento mobile multiplataforma.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.linkContainer}>
        <Link href="/(tabs)">
          <ThemedText type="link">← Voltar para Home</ThemedText>
        </Link>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  linkContainer: {
    marginTop: 16,
    paddingTop: 16,
  },
});