import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  useColorScheme
} from 'react-native';

interface Game {
  id: number;
  title: string;
  short_description: string;
  thumbnail: string;
  genre: string;
  platform: string;
  publisher: string;
  release_date: string;
}

export default function HomeScreen() {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Buscar jogos da API
  useEffect(() => {
    fetchGames();
  }, []);

  // Filtrar jogos quando a busca mudar
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredGames(games);
    } else {
      const filtered = games.filter(game =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredGames(filtered);
      setCurrentPage(1); // Resetar para primeira página ao buscar
    }
  }, [searchQuery, games]);

  const fetchGames = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('https://www.freetogame.com/api/games');

      if (!response.ok) {
        throw new Error('Erro ao carregar dados...');
      }

      const data = await response.json();
      setGames(data);
      setFilteredGames(data);

    } catch (err) {
      setError('Erro ao carregar dados...');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  // Paginação
  const totalPages = Math.ceil(filteredGames.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentGames = filteredGames.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Renderizar card de jogo
  const renderGameCard = ({ item }: { item: Game }) => (
    <View style={[styles.card, isDark && styles.cardDark]}>
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={[styles.title, isDark && styles.textDark]}>{item.title}</Text>
        <Text style={[styles.description, isDark && styles.textDark]} numberOfLines={2}>
          {item.short_description}
        </Text>
        <View style={styles.infoRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.genre}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.platform}</Text>
          </View>
        </View>
        <Text style={[styles.publisher, isDark && styles.textDark]}>
          {item.publisher} • {item.release_date}
        </Text>
      </View>
    </View>
  );

  // Estado de carregamento
  if (loading) {
    return (
      <View style={[styles.centerContainer, isDark && styles.containerDark]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={[styles.loadingText, isDark && styles.textDark]}>Carregando...</Text>
      </View>
    );
  }

  // Estado de erro
  if (error) {
    return (
      <View style={[styles.centerContainer, isDark && styles.containerDark]}>
        <Text style={[styles.errorText, isDark && styles.textDark]}>❌ {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchGames}>
          <Text style={styles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      {/* Header */}
      <View style={[styles.header, isDark && styles.headerDark]}>
        <Text style={[styles.headerTitle, isDark && styles.textDark]}>🎮 Jogos Grátis</Text>
        <Text style={[styles.headerSubtitle, isDark && styles.textDark]}>
          {filteredGames.length} jogos disponíveis
        </Text>
      </View>

      {/* Busca */}
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, isDark && styles.searchInputDark]}
          placeholder="🔍 Buscar jogo..."
          placeholderTextColor={isDark ? '#888' : '#999'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Lista de jogos */}
      <FlatList
        data={currentGames}
        renderItem={renderGameCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Paginação */}
      <View style={[styles.pagination, isDark && styles.paginationDark]}>
        <TouchableOpacity
          style={[styles.pageButton, currentPage === 1 && styles.pageButtonDisabled]}
          onPress={goToPreviousPage}
          disabled={currentPage === 1}
        >
          <Text style={styles.pageButtonText}>← Anterior</Text>
        </TouchableOpacity>

        <Text style={[styles.pageInfo, isDark && styles.textDark]}>
          Página {currentPage} de {totalPages}
        </Text>

        <TouchableOpacity
          style={[styles.pageButton, currentPage === totalPages && styles.pageButtonDisabled]}
          onPress={goToNextPage}
          disabled={currentPage === totalPages}
        >
          <Text style={styles.pageButtonText}>Próxima →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containerDark: {
    backgroundColor: '#1a1a1a',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerDark: {
    backgroundColor: '#2a2a2a',
    borderBottomColor: '#444',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  searchContainer: {
    padding: 15,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    color: '#333',
  },
  searchInputDark: {
    backgroundColor: '#2a2a2a',
    borderColor: '#444',
    color: '#fff',
  },
  listContent: {
    padding: 15,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardDark: {
    backgroundColor: '#2a2a2a',
  },
  thumbnail: {
    width: '100%',
    height: 200,
  },
  cardContent: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  publisher: {
    fontSize: 12,
    color: '#999',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  paginationDark: {
    backgroundColor: '#2a2a2a',
    borderTopColor: '#444',
  },
  pageButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  pageButtonDisabled: {
    backgroundColor: '#ccc',
  },
  pageButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  pageInfo: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  textDark: {
    color: '#fff',
  },
});
