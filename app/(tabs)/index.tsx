import { Image } from 'expo-image';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
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
        <ThemedText type="title">Exercícios React Native</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.description}>
        <ThemedText>
          Selecione um dos exercícios abaixo para visualizar a implementação dos conceitos de React Hooks.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.exerciciosContainer}>
        <Link href="./exercicio1" asChild>
          <TouchableOpacity style={styles.exercicioCard} activeOpacity={0.7}>
            <ThemedView style={styles.cardContent}>
              <ThemedText type="subtitle">Exercício 1 📊</ThemedText>
              <ThemedText style={styles.cardDescription}>
                Contador com useState - Aumentar e Diminuir
              </ThemedText>
            </ThemedView>
          </TouchableOpacity>
        </Link>

        <Link href="./exercicio2" asChild>
          <TouchableOpacity style={styles.exercicioCard} activeOpacity={0.7}>
            <ThemedView style={styles.cardContent}>
              <ThemedText type="subtitle">Exercício 2 👁️</ThemedText>
              <ThemedText style={styles.cardDescription}>
                Toggle de Visibilidade - Mostrar/Esconder Texto
              </ThemedText>
            </ThemedView>
          </TouchableOpacity>
        </Link>

        <Link href="./exercicio3" asChild>
          <TouchableOpacity style={styles.exercicioCard} activeOpacity={0.7}>
            <ThemedView style={styles.cardContent}>
              <ThemedText type="subtitle">Exercício 3 🔄</ThemedText>
              <ThemedText style={styles.cardDescription}>
                useEffect - Log de mudanças do contador
              </ThemedText>
            </ThemedView>
          </TouchableOpacity>
        </Link>

        <Link href="./exercicio4" asChild>
          <TouchableOpacity style={styles.exercicioCard} activeOpacity={0.7}>
            <ThemedView style={styles.cardContent}>
              <ThemedText type="subtitle">Exercício 4 🔔</ThemedText>
              <ThemedText style={styles.cardDescription}>
                useEffect com [] - Alert de Boas-vindas
              </ThemedText>
            </ThemedView>
          </TouchableOpacity>
        </Link>

        <Link href="./exercicio5" asChild>
          <TouchableOpacity style={styles.exercicioCard} activeOpacity={0.7}>
            <ThemedView style={styles.cardContent}>
              <ThemedText type="subtitle">Exercício 5 👋</ThemedText>
              <ThemedText style={styles.cardDescription}>
                useCallback - Memorização de Funções
              </ThemedText>
            </ThemedView>
          </TouchableOpacity>
        </Link>

        <Link href="./exercicio6" asChild>
          <TouchableOpacity style={styles.exercicioCard} activeOpacity={0.7}>
            <ThemedView style={styles.cardContent}>
              <ThemedText type="subtitle">Exercício 6 🌓</ThemedText>
              <ThemedText style={styles.cardDescription}>
                useContext - Theme Provider (Dark/Light)
              </ThemedText>
            </ThemedView>
          </TouchableOpacity>
        </Link>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Conceitos Cobertos:</ThemedText>
        <ThemedText>• useState - Gerenciamento de estado</ThemedText>
        <ThemedText>• useEffect - Efeitos colaterais e ciclo de vida</ThemedText>
        <ThemedText>• useCallback - Otimização de performance</ThemedText>
        <ThemedText>• useContext - Compartilhamento de estado global</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Como usar:</ThemedText>
        <ThemedText>
          Navegue pelas abas na parte inferior ou clique nos cards acima para acessar cada exercício.
        </ThemedText>
        <ThemedText style={styles.note}>
          💡 Dica: Abra o console do desenvolvedor para ver os logs dos exercícios 3 e 5.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  description: {
    marginBottom: 20,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    marginTop: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  exerciciosContainer: {
    gap: 12,
    marginBottom: 20,
  },
  exercicioCard: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#0a7ea4',
    backgroundColor: 'transparent',
  },
  cardContent: {
    padding: 16,
    gap: 8,
  },
  cardDescription: {
    opacity: 0.7,
    fontSize: 14,
  },
  note: {
    fontStyle: 'italic',
    opacity: 0.8,
    marginTop: 8,
  },
});
