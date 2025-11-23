import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface Personagem {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

export default function Index() {
  const [dados, setDados] = useState<Personagem[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [busca, setBusca] = useState('');

  async function buscarDados(page: number) {
    try {
      setCarregando(true);
      setErro('');

      const resposta = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);

      if (!resposta.ok) {
        throw new Error('Erro na requisição');
      }

      const json = await resposta.json();

      setDados(json.results);
      setTotalPaginas(json.info.pages);
    } catch (e) {
      setErro('Erro ao carregar dados...');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarDados(pagina);
  }, [pagina]);

  const dadosFiltrados = dados.filter(item =>
    item.name.toLowerCase().includes(busca.toLowerCase())
  );

  function renderItem({ item }: { item: Personagem }) {
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.imagem} />
        <View>
          <Text style={styles.nome}>{item.name}</Text>
          <Text style={styles.info}>Status: {item.status}</Text>
          <Text style={styles.info}>Espécie: {item.species}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Rick and Morty - Personagens</Text>

      <TextInput
        style={styles.input}
        placeholder="Buscar por nome"
        value={busca}
        onChangeText={setBusca}
      />

      {carregando && (
        <View style={styles.centralizado}>
          <ActivityIndicator size="large" />
          <Text style={styles.mensagem}>Carregando...</Text>
        </View>
      )}

      {erro !== '' && !carregando && (
        <View style={styles.centralizado}>
          <Text style={styles.mensagemErro}>{erro}</Text>
        </View>
      )}

      {!carregando && erro === '' && (
        <FlatList
          data={dadosFiltrados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.botao, pagina === 1 && styles.botaoDesabilitado]}
          onPress={() => pagina > 1 && setPagina(pagina - 1)}
          disabled={pagina === 1}
        >
          <Text style={styles.textoBotao}>Página Anterior</Text>
        </TouchableOpacity>

        <Text style={styles.paginaTexto}>
          Página {pagina} de {totalPaginas}
        </Text>

        <TouchableOpacity
          style={[styles.botao, pagina === totalPaginas && styles.botaoDesabilitado]}
          onPress={() => pagina < totalPaginas && setPagina(pagina + 1)}
          disabled={pagina === totalPaginas}
        >
          <Text style={styles.textoBotao}>Próxima Página</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
    padding: 16,
    paddingTop: 40
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#1f1f1f',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagem: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  info: {
    fontSize: 12,
    color: '#cccccc',
  },
  centralizado: {
    alignItems: 'center',
    marginTop: 20,
  },
  mensagem: {
    color: '#fff',
    marginTop: 8,
  },
  mensagemErro: {
    color: '#ff5555',
    marginTop: 8,
  },
  footer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  botao: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  botaoDesabilitado: {
    backgroundColor: '#555',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  paginaTexto: {
    color: '#fff',
    fontSize: 12,
  },
});
