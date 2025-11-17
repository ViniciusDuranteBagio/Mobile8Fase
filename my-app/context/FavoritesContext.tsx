import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

import type { Movie } from '@/services/moviesAPI';

interface FavoritesContextType {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => Promise<void>;
  removeFromFavorites: (movieId: number) => Promise<void>;
  isFavorite: (movieId: number) => boolean;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_KEY = '@movie_favorites';

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Carregar favoritos do AsyncStorage ao iniciar
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const savedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
      if (savedFavorites) {
        const parsedFavorites: Movie[] = JSON.parse(savedFavorites);
        setFavorites(parsedFavorites);
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveFavorites = async (newFavorites: Movie[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Erro ao salvar favoritos:', error);
    }
  };

  const addToFavorites = async (movie: Movie) => {
    try {
      const newFavorites = [...favorites, movie];
      setFavorites(newFavorites);
      await saveFavorites(newFavorites);
    } catch (error) {
      console.error('Erro ao adicionar aos favoritos:', error);
    }
  };

  const removeFromFavorites = async (movieId: number) => {
    try {
      const newFavorites = favorites.filter(movie => movie.id !== movieId);
      setFavorites(newFavorites);
      await saveFavorites(newFavorites);
    } catch (error) {
      console.error('Erro ao remover dos favoritos:', error);
    }
  };

  const isFavorite = (movieId: number): boolean => {
    return favorites.some(movie => movie.id === movieId);
  };

  const value: FavoritesContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    loading,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextType {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites deve ser usado dentro de um FavoritesProvider');
  }
  return context;
}