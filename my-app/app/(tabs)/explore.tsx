import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useFavorites } from '@/context/FavoritesContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { Movie } from '@/services/moviesAPI';
import { moviesAPI } from '@/services/moviesAPI';

export default function FavoritesScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { favorites, removeFromFavorites, loading } = useFavorites();

  // Função para formatar nota
  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  // Renderizar item de filme favorito
  const renderFavoriteItem = ({ item: movie }: { item: Movie }) => (
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
        onPress={() => removeFromFavorites(movie.id)}
      >
        <Ionicons name="heart" size={24} color="#ff4757" />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
        <ThemedView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <ThemedText style={styles.loadingText}>Carregando favoritos...</ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>❤️ Favoritos</ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          {favorites.length > 0 ? `${favorites.length} filme${favorites.length > 1 ? 's' : ''} favorito${favorites.length > 1 ? 's' : ''}` : 'Seus filmes favoritos'}
        </ThemedText>
      </ThemedView>

      {favorites.length === 0 ? (
        <ThemedView style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={64} color="#999" />
          <ThemedText style={styles.emptyTitle}>Nenhum favorito ainda</ThemedText>
          <ThemedText style={styles.emptyDescription}>
            Adicione filmes aos favoritos tocando no ícone de coração na tela principal
          </ThemedText>
        </ThemedView>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.moviesList}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
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
    padding: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 24,
  },
});
