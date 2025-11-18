import axios from 'axios';
import { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { CampoBusca } from '@/components/campo-busca';
import { ControlesPaginacao } from '@/components/controles-paginacao';
import { ListaPersonagens } from '@/components/lista-personagens';
import { PersonagemSwapi, RespostaSwapi } from '@/types/swapi';

const URL_API = 'https://swapi.dev/api/people';

export default function TelaPersonagens() {
  const [personagens, definirPersonagens] = useState<PersonagemSwapi[]>([]);
  const [paginaAtual, definirPaginaAtual] = useState(1);
  const [carregandoPagina, definirCarregandoPagina] = useState(false);
  const [mensagemErroPagina, definirMensagemErroPagina] = useState<string | null>(null);
  const [temProximaPagina, definirTemProximaPagina] = useState(false);
  const [temPaginaAnterior, definirTemPaginaAnterior] = useState(false);
  const [textoBusca, definirTextoBusca] = useState('');
  const [personagensBusca, definirPersonagensBusca] = useState<PersonagemSwapi[]>([]);
  const [carregandoBusca, definirCarregandoBusca] = useState(false);
  const [mensagemErroBusca, definirMensagemErroBusca] = useState<string | null>(null);

  useEffect(() => {
    let componenteAtivo = true;

    async function carregarPersonagens() {
      definirCarregandoPagina(true);
      definirMensagemErroPagina(null);

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

        definirMensagemErroPagina('Erro ao carregar dados. Tente novamente.');
        definirPersonagens([]);
        definirTemProximaPagina(false);
        definirTemPaginaAnterior(paginaAtual > 1);
      } finally {
        if (componenteAtivo) {
          definirCarregandoPagina(false);
        }
      }
    }

    carregarPersonagens();

    return () => {
      componenteAtivo = false;
    };
  }, [paginaAtual]);

  useEffect(() => {
    const termo = textoBusca.trim();
    let efeitoAtivo = true;

    if (!termo) {
      definirPersonagensBusca([]);
      definirMensagemErroBusca(null);
      definirCarregandoBusca(false);
      return;
    }

    definirCarregandoBusca(true);
    definirMensagemErroBusca(null);

    const timeoutId = setTimeout(async () => {
      try {
        const resposta = await axios.get<RespostaSwapi>(
          `${URL_API}?search=${encodeURIComponent(termo)}`,
        );

        if (!efeitoAtivo) {
          return;
        }

        definirPersonagensBusca(resposta.data.results);
      } catch {
        if (!efeitoAtivo) {
          return;
        }

        definirMensagemErroBusca('Erro ao buscar personagens. Tente novamente.');
        definirPersonagensBusca([]);
      } finally {
        if (efeitoAtivo) {
          definirCarregandoBusca(false);
        }
      }
    }, 500);

    return () => {
      efeitoAtivo = false;
      clearTimeout(timeoutId);
    };
  }, [textoBusca]);

  const exibindoBusca = textoBusca.trim().length > 0;
  const personagensVisiveis = exibindoBusca ? personagensBusca : personagens;
  const carregandoAtual = exibindoBusca ? carregandoBusca : carregandoPagina;
  const mensagemErroAtual = exibindoBusca ? mensagemErroBusca : mensagemErroPagina;

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

        {carregandoAtual && (
          <View style={estilos.conteudoCentralizado}>
            <ActivityIndicator size="large" color="#FFE81F" />
            <Text style={estilos.textoAjuda}>Carregando...</Text>
          </View>
        )}

        {!carregandoAtual && mensagemErroAtual && (
          <View style={estilos.conteudoCentralizado}>
            <Text style={estilos.textoErro}>{mensagemErroAtual}</Text>
          </View>
        )}

        {!carregandoAtual && !mensagemErroAtual && (
          <ListaPersonagens personagens={personagensVisiveis} />
        )}

        <ControlesPaginacao
          temPaginaAnterior={exibindoBusca ? false : temPaginaAnterior}
          temProximaPagina={exibindoBusca ? false : temProximaPagina}
          desabilitado={carregandoAtual || exibindoBusca}
          aoPressionarAnterior={irParaPaginaAnterior}
          aoPressionarProxima={irParaProximaPagina}
        />

        <Text style={estilos.textoPagina}>
          {!exibindoBusca ? 'Página atual: ' + paginaAtual : ''}
        </Text>
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
