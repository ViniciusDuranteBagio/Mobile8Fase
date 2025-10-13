import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ProfileScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
          contentFit="cover"
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Meu Perfil</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Informações Pessoais</ThemedText>
        <ThemedText>
          Nome: <ThemedText type="defaultSemiBold">Luiz Fernando</ThemedText>
        </ThemedText>
        <ThemedText>
          Email: <ThemedText type="defaultSemiBold">luizfernandomendesalberton@gmail.com</ThemedText>
        </ThemedText>
        <ThemedText>
          Plataforma: <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'iOS',
              android: 'Android',
              web: 'Web',
            })}
          </ThemedText>
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Configurações</ThemedText>
        <ThemedText>
          Aqui você pode personalizar suas preferências e configurações do aplicativo.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Estatísticas</ThemedText>
        <ThemedText>
          • Tempo no aplicativo: <ThemedText type="defaultSemiBold">2 horas</ThemedText>
        </ThemedText>
        <ThemedText>
          • Páginas visitadas: <ThemedText type="defaultSemiBold">15</ThemedText>
        </ThemedText>
        <ThemedText>
          • Última visita: <ThemedText type="defaultSemiBold">Hoje</ThemedText>
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
});