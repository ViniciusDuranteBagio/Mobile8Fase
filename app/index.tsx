import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = 'https://rickandmortyapi.com/api/character';

export default function App() {
  const [personagens, setPersonagens] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const [busca, setBusca] = useState('');        // texto digitado
  const [filtroNome, setFiltroNome] = useState(''); // texto aplicado na API

  // Função que faz a requisição HTTP real
  const carregarPersonagens = async () => {
    try {
      setCarregando(true);
      setErro(null);

      let url = `${API_URL}?page=${pagina}`;
      if (filtroNome) {
        url += `&name=${encodeURIComponent(filtroNome)}`;
      }

      const resposta = await fetch(url);

      if (!resposta.ok) {
        // Se der erro 404 na busca, por exemplo
        throw new Error('Erro ao buscar dados. Verifique o filtro ou tente novamente.');
      }

      const dados = await resposta.json();

      setPersonagens(dados.results || []);
      setTotalPaginas(dados.info?.pages || 1);
    } catch (error) {
      setErro(error.message);
      setPersonagens([]);
      setTotalPaginas(1);
    } finally {
      setCarregando(false);
    }
  };

  // useEffect para disparar a requisição sempre que página ou filtro mudar
  useEffect(() => {
    carregarPersonagens();
  }, [pagina, filtroNome]);

  const handleProximaPagina = () => {
    if (pagina < totalPaginas) {
      setPagina((pag) => pag + 1);
    }
  };

  const handlePaginaAnterior = () => {
    if (pagina > 1) {
      setPagina((pag) => pag - 1);
    }
  };

  const aplicarFiltro = () => {
    setPagina(1);        // sempre volta pra primeira página ao filtrar
    setFiltroNome(busca);
  };

  const limparFiltro = () => {
    setBusca('');
    setFiltroNome('');
    setPagina(1);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardText}>Espécie: {item.species}</Text>
        <Text style={styles.cardText}>Status: {item.status}</Text>
        <Text style={styles.cardText}>Origem: {item.origin?.name}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Rick and Morty Explorer</Text>

      {/* Campo de busca (Ponto extra) */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar personagem por nome..."
          placeholderTextColor="#999"
          value={busca}
          onChangeText={setBusca}
        />
        <View style={styles.searchButtonsRow}>
          <TouchableOpacity style={styles.searchButton} onPress={aplicarFiltro}>
            <Text style={styles.searchButtonText}>Buscar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={limparFiltro}>
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Estados de carregamento e erro */}
      {carregando && (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={styles.infoText}>Carregando...</Text>
        </View>
      )}

      {erro && !carregando && (
        <View style={styles.center}>
          <Text style={styles.errorText}>Erro ao carregar dados:</Text>
          <Text style={styles.errorText}>{erro}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={carregarPersonagens}>
            <Text style={styles.retryButtonText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      )}

      {!carregando && !erro && (
        <>
          {personagens.length === 0 ? (
            <View style={styles.center}>
              <Text style={styles.infoText}>Nenhum personagem encontrado.</Text>
            </View>
          ) : (
            <FlatList
              data={personagens}
              keyExtractor={(item) => String(item.id)}
              renderItem={renderItem}
              contentContainerStyle={styles.listContent}
            />
          )}

          {/* Navegação entre páginas */}
          <View style={styles.paginationContainer}>
            <TouchableOpacity
              style={[
                styles.pageButton,
                pagina === 1 && styles.pageButtonDisabled,
              ]}
              onPress={handlePaginaAnterior}
              disabled={pagina === 1}
            >
              <Text style={styles.pageButtonText}>Página Anterior</Text>
            </TouchableOpacity>

            <Text style={styles.pageInfo}>
              Página {pagina} de {totalPaginas}
            </Text>

            <TouchableOpacity
              style={[
                styles.pageButton,
                pagina === totalPaginas && styles.pageButtonDisabled,
              ]}
              onPress={handleProximaPagina}
              disabled={pagina === totalPaginas}
            >
              <Text style={styles.pageButtonText}>Próxima Página</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1526',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00FF9D',
    textAlign: 'center',
    marginBottom: 16,
  },
  searchContainer: {
    marginBottom: 12,
    backgroundColor: '#111827',
    padding: 12,
    borderRadius: 8,
  },
  searchInput: {
    backgroundColor: '#0b1120',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#fff',
    marginBottom: 8,
  },
  searchButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  searchButton: {
    flex: 1,
    backgroundColor: '#00FF9D',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginRight: 4,
  },
  searchButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#4B5563',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginLeft: 4,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#111827',
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
  },
  cardImage: {
    width: 100,
    height: 100,
  },
  cardContent: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E5E7EB',
    marginBottom: 4,
  },
  cardText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingVertical: 8,
  },
  pageButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#00FF9D',
    borderRadius: 6,
  },
  pageButtonDisabled: {
    backgroundColor: '#6B7280',
  },
  pageButtonText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 12,
  },
  pageInfo: {
    color: '#E5E7EB',
    fontSize: 12,
  },
  center: {
    alignItems: 'center',
    marginTop: 24,
  },
  infoText: {
    color: '#E5E7EB',
    marginTop: 8,
  },
  errorText: {
    color: '#F97373',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 12,
    backgroundColor: '#F97316',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  retryButtonText: {
    color: '#111827',
    fontWeight: 'bold',
  },
});
