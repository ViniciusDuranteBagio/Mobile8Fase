import axios from 'axios';

// TMDB API Configuration
const API_KEY = '4e44d9029b1270a757cddc766a1bcb63'; // Chave pública para testes
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export const moviesAPI = {
  // Buscar filmes populares com paginação
  getPopularMovies: async (page: number = 1): Promise<MoviesResponse> => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
          api_key: API_KEY,
          page,
          language: 'pt-BR'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar filmes populares:', error);
      throw new Error('Falha ao carregar filmes populares');
    }
  },

  // Buscar filmes por nome
  searchMovies: async (query: string, page: number = 1): Promise<MoviesResponse> => {
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query,
          page,
          language: 'pt-BR'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
      throw new Error('Falha ao buscar filmes');
    }
  },

  // Buscar gêneros
  getGenres: async (): Promise<Genre[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
        params: {
          api_key: API_KEY,
          language: 'pt-BR'
        }
      });
      return response.data.genres;
    } catch (error) {
      console.error('Erro ao buscar gêneros:', error);
      throw new Error('Falha ao carregar gêneros');
    }
  },

  // Obter URL completa da imagem
  getImageUrl: (path: string): string => {
    return path ? `${IMAGE_BASE_URL}${path}` : '';
  }
};