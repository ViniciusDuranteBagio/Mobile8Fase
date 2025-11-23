import { StyleSheet } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          📖 Sobre o Projeto
        </ThemedText>
      </ThemedView>
      <ThemedText>
        Aplicativo Mobile de Jogos Grátis consumindo a API FreeToGame
      </ThemedText>

      <Collapsible title="🎮 Funcionalidades">
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Listagem de jogos</ThemedText> com cards organizados
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Paginação funcional</ThemedText> (10 jogos por página)
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Busca por nome</ThemedText> do jogo
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Estados de carregamento</ThemedText> e erro
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Suporte a modo escuro</ThemedText>
        </ThemedText>
      </Collapsible>

      <Collapsible title="🛠️ Stack Tecnológica">
        <ThemedText>
          • <ThemedText type="defaultSemiBold">React Native</ThemedText> - Framework mobile
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Expo</ThemedText> - Plataforma de desenvolvimento
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">TypeScript</ThemedText> - Tipagem estática
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">useState & useEffect</ThemedText> - React Hooks
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">fetch</ThemedText> - Requisições HTTP
        </ThemedText>
      </Collapsible>

      <Collapsible title="🌐 API Utilizada">
        <ThemedText>
          <ThemedText type="defaultSemiBold">FreeToGame API</ThemedText> - Base de dados de jogos grátis
        </ThemedText>
        <ThemedText style={{ marginTop: 8 }}>
          Endpoint: https://www.freetogame.com/api/games
        </ThemedText>
        <ThemedText style={{ marginTop: 8 }}>
          Retorna informações como título, descrição, imagem, gênero, plataforma, publisher e data de lançamento.
        </ThemedText>
        <ExternalLink href="https://www.freetogame.com/api-doc">
          <ThemedText type="link">Documentação da API</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="📱 Como usar">
        <ThemedText>
          1. A tela inicial exibe todos os jogos disponíveis
        </ThemedText>
        <ThemedText>
          2. Use a barra de busca para filtrar jogos por nome
        </ThemedText>
        <ThemedText>
          3. Navegue entre páginas usando os botões &quot;Anterior&quot; e &quot;Próxima&quot;
        </ThemedText>
        <ThemedText>
          4. Veja detalhes como gênero, plataforma e publisher em cada card
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
