import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { CampoBusca } from '@/components/campo-busca';
import { ControlesPaginacao } from '@/components/controles-paginacao';
import { ListaPersonagens } from '@/components/lista-personagens';
import { PersonagemSwapi, RespostaSwapi } from '@/types/swapi';

const URL_API = 'https://swapi.dev/api/people';

export default function TelaPersonagens() {
  const [personagens, definirPersonagens] = useState<PersonagemSwapi[]>([]);
  const [paginaAtual, definirPaginaAtual] = useState(1);
  const [carregando, definirCarregando] = useState(false);
  const [mensagemErro, definirMensagemErro] = useState<string | null>(null);
  const [temProximaPagina, definirTemProximaPagina] = useState(false);
  const [temPaginaAnterior, definirTemPaginaAnterior] = useState(false);
  const [textoBusca, definirTextoBusca] = useState('');

  useEffect(() => {
    let componenteAtivo = true;

    async function carregarPersonagens() {
      definirCarregando(true);
      definirMensagemErro(null);

      try {
        const resposta = await axios.get<RespostaSwapi>(`${URL_API}?page=${paginaAtual}`);

        if (!componenteAtivo) {
          return;
        }

        definirPersonagens(resposta.data.results);
        definirTemProximaPagina(Boolean(resposta.data.next));
        definirTemPaginaAnterior(Boolean(resposta.data.previous));
      } catch {
        if (!componenteAtivo) {
          return;
        }

        definirMensagemErro('Erro ao carregar dados. Tente novamente.');
        definirPersonagens([]);
        definirTemProximaPagina(false);
        definirTemPaginaAnterior(paginaAtual > 1);
      } finally {
        if (componenteAtivo) {
          definirCarregando(false);
        }
      }
    }

    carregarPersonagens();

    return () => {
      componenteAtivo = false;
    };
  }, [paginaAtual]);

  const personagensFiltrados = useMemo(() => {
    const termo = textoBusca.trim().toLowerCase();

    if (!termo) {
      return personagens;
    }

    return personagens.filter((personagem) => personagem.name.toLowerCase().includes(termo));
  }, [personagens, textoBusca]);

  const irParaProximaPagina = () => {
    if (temProximaPagina) {
      definirPaginaAtual((pagina) => pagina + 1);
    }
  };

  const irParaPaginaAnterior = () => {
    if (temPaginaAnterior) {
      definirPaginaAtual((pagina) => Math.max(1, pagina - 1));
    }
  };

  return (
    <SafeAreaView style={estilos.areaSegura}>
      <View style={estilos.container}>
        <Text style={estilos.titulo}>Enciclopédia Star Wars</Text>

        <CampoBusca valor={textoBusca} aoAlterar={definirTextoBusca} />

        {carregando && (
          <View style={estilos.conteudoCentralizado}>
            <ActivityIndicator size="large" color="#FFE81F" />
            <Text style={estilos.textoAjuda}>Carregando...</Text>
          </View>
        )}

        {!carregando && mensagemErro && (
          <View style={estilos.conteudoCentralizado}>
            <Text style={estilos.textoErro}>{mensagemErro}</Text>
          </View>
        )}

        {!carregando && !mensagemErro && (
          <ListaPersonagens personagens={personagensFiltrados} />
        )}

        <ControlesPaginacao
          temPaginaAnterior={temPaginaAnterior}
          temProximaPagina={temProximaPagina}
          desabilitado={carregando}
          aoPressionarAnterior={irParaPaginaAnterior}
          aoPressionarProxima={irParaProximaPagina}
        />

        <Text style={estilos.textoPagina}>Página atual: {paginaAtual}</Text>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: '#05090F',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subtitulo: {
    fontSize: 15,
    color: '#9AA0AB',
    lineHeight: 20,
  },
  conteudoCentralizado: {
    alignItems: 'center',
    gap: 8,
    paddingVertical: 32,
  },
  textoAjuda: {
    color: '#9AA0AB',
  },
  textoErro: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
  textoPagina: {
    textAlign: 'center',
    color: '#9AA0AB',
  },
});
