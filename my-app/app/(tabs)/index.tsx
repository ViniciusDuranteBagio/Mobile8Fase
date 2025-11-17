import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useFavorites } from '@/context/FavoritesContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { Movie, MoviesResponse } from '@/services/moviesAPI';
import { moviesAPI } from '@/services/moviesAPI';

export default function MoviesScreen() {
  // Estados obrigatórios usando useState
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  // useEffect obrigatório para carregar dados da API
  useEffect(() => {
    loadMovies();
  }, [currentPage]);

  // Função para carregar filmes da API
  const loadMovies = async () => {
    try {
      setLoading(true);
      setError('');
      
      let response: MoviesResponse;
      
      if (searchQuery.trim()) {
        response = await moviesAPI.searchMovies(searchQuery, currentPage);
        setIsSearching(true);
      } else {
        response = await moviesAPI.getPopularMovies(currentPage);
        setIsSearching(false);
      }
      
      setMovies(response.results);
      setTotalPages(response.total_pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar filmes');
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar filmes
  const handleSearch = () => {
    setCurrentPage(1);
    loadMovies();
  };

  // Função para limpar busca
  const clearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
    setIsSearching(false);
    loadMovies();
  };

  // Navegação de páginas (requisito obrigatório)
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // Função para formatar nota
  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  // Função para toggle de favoritos
  const toggleFavorite = async (movie: Movie) => {
    try {
      if (isFavorite(movie.id)) {
        await removeFromFavorites(movie.id);
      } else {
        await addToFavorites(movie);
      }
    } catch (error) {
      console.error('Erro ao atualizar favoritos:', error);
    }
  };

  // Renderizar item de filme
  const renderMovieItem = ({ item: movie }: { item: Movie }) => (
    <View style={[styles.movieCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
      <Image
        source={{
          uri: movie.poster_path 
            ? moviesAPI.getImageUrl(movie.poster_path)
            : 'https://via.placeholder.com/200x300?text=No+Image'
        }}
        style={styles.moviePoster}
        resizeMode="cover"
      />
      <View style={styles.movieInfo}>
        <ThemedText style={styles.movieTitle} numberOfLines={2}>
          {movie.title}
        </ThemedText>
        <ThemedText style={styles.movieOverview} numberOfLines={3}>
          {movie.overview || 'Sem descrição disponível'}
        </ThemedText>
        <View style={styles.movieMeta}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <ThemedText style={styles.rating}>
              {formatRating(movie.vote_average)}
            </ThemedText>
          </View>
          <ThemedText style={styles.releaseDate}>
            {new Date(movie.release_date).getFullYear() || 'N/A'}
          </ThemedText>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.favoriteButton} 
        onPress={() => toggleFavorite(movie)}
      >
        <Ionicons 
          name={isFavorite(movie.id) ? "heart" : "heart-outline"} 
          size={24} 
          color={isFavorite(movie.id) ? "#ff4757" : "#999"} 
        />
      </TouchableOpacity>
    </View>
  );

  // Estado de carregamento (requisito obrigatório)
  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
        <ThemedView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <ThemedText style={styles.loadingText}>Carregando filmes...</ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  // Estado de erro (requisito obrigatório)
  if (error) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
        <ThemedView style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={64} color="#ff4757" />
          <ThemedText style={styles.errorText}>Erro ao carregar dados</ThemedText>
          <ThemedText style={styles.errorMessage}>{error}</ThemedText>
          <TouchableOpacity style={styles.retryButton} onPress={loadMovies}>
            <ThemedText style={styles.retryButtonText}>Tentar Novamente</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>🎬 Filmes</ThemedText>
        <ThemedText style={styles.subtitle}>
          {isSearching ? `Busca: "${searchQuery}"` : 'Filmes Populares'}
        </ThemedText>
      </ThemedView>

      {/* Search Bar (Filtro - Ponto Extra) */}
      <View style={[styles.searchContainer, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}>
        <TextInput
          style={[styles.searchInput, { color: isDark ? '#fff' : '#000' }]}
          placeholder="Buscar filmes..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={20} color="#007AFF" />
        </TouchableOpacity>
        {searchQuery.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Movies List */}
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.moviesList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <ThemedView style={styles.emptyContainer}>
            <Ionicons name="film-outline" size={64} color="#999" />
            <ThemedText style={styles.emptyText}>
              {isSearching ? 'Nenhum filme encontrado' : 'Nenhum filme disponível'}
            </ThemedText>
          </ThemedView>
        }
      />

      {/* Pagination Controls (Requisito Obrigatório) */}
      <View style={[styles.paginationContainer, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}>
        <TouchableOpacity
          style={[styles.pageButton, currentPage === 1 && styles.pageButtonDisabled]}
          onPress={goToPrevPage}
          disabled={currentPage === 1}
        >
          <Ionicons 
            name="chevron-back" 
            size={20} 
            color={currentPage === 1 ? '#999' : '#007AFF'} 
          />
          <ThemedText style={[
            styles.pageButtonText,
            currentPage === 1 && styles.pageButtonTextDisabled
          ]}>
            Anterior
          </ThemedText>
        </TouchableOpacity>

        <View style={styles.pageInfo}>
          <ThemedText style={styles.pageText}>
            Página {currentPage} de {totalPages}
          </ThemedText>
        </View>

        <TouchableOpacity
          style={[styles.pageButton, currentPage === totalPages && styles.pageButtonDisabled]}
          onPress={goToNextPage}
          disabled={currentPage === totalPages}
        >
          <ThemedText style={[
            styles.pageButtonText,
            currentPage === totalPages && styles.pageButtonTextDisabled
          ]}>
            Próxima
          </ThemedText>
          <Ionicons 
            name="chevron-forward" 
            size={20} 
            color={currentPage === totalPages ? '#999' : '#007AFF'} 
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  errorText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e1e8ed',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1e8ed',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  searchButton: {
    padding: 8,
  },
  clearButton: {
    padding: 8,
  },
  moviesList: {
    padding: 16,
  },
  movieCard: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  moviePoster: {
    width: 80,
    height: 120,
    borderRadius: 8,
  },
  movieInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  movieOverview: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginVertical: 8,
  },
  movieMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
  },
  releaseDate: {
    fontSize: 14,
    color: '#666',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
    textAlign: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e1e8ed',
  },
  pageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  pageButtonDisabled: {
    opacity: 0.5,
  },
  pageButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  pageButtonTextDisabled: {
    color: '#999',
  },
  pageInfo: {
    alignItems: 'center',
  },
  pageText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
});