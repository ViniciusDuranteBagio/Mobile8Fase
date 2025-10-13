import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ExploreScreen() {
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
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Descubra Recursos</ThemedText>
        <ThemedText>
          Esta seção é dedicada à exploração de funcionalidades e recursos 
          do aplicativo. Aqui você pode descobrir novas possibilidades e 
          aprender mais sobre as capacidades da plataforma.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Recursos Disponíveis</ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Navegação Intuitiva</ThemedText> - Sistema de abas e navegação fluida
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Componentes Reutilizáveis</ThemedText> - Biblioteca de componentes personalizados
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Temas Adaptativos</ThemedText> - Suporte automático para modo claro e escuro
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Performance Otimizada</ThemedText> - Carregamento rápido e responsivo
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Tecnologias em Destaque</ThemedText>
        <ThemedText>
          Explore as tecnologias modernas que tornam este aplicativo possível:
        </ThemedText>
        <ThemedText>
          • React Native - Framework multiplataforma
        </ThemedText>
        <ThemedText>
          • Expo SDK - Ferramentas de desenvolvimento
        </ThemedText>
        <ThemedText>
          • TypeScript - Tipagem estática para JavaScript
        </ThemedText>
        <ThemedText>
          • React Navigation - Sistema de navegação robusto
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Próximos Passos</ThemedText>
        <ThemedText>
          Continue explorando as diferentes abas para descobrir mais 
          funcionalidades e recursos disponíveis no aplicativo.
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