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

interface Pokemon {
  name: string;
  url: string;
  id: number;
  image: string;
}

interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

export default function PokedexScreen() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string>(''); 
  const [offset, setOffset] = useState<number>(0); 
  const [searchText, setSearchText] = useState<string>(''); 
  const [searchTimeout, setSearchTimeout] = useState<number | null>(null); 
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const LIMIT = 20; 

  useEffect(() => {
    if (!isSearching) {
      fetchPokemons();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar pokémons');
      }

      const data: PokemonResponse = await response.json();

      const pokemonList: Pokemon[] = data.results.map((pokemon) => {
        const id = parseInt(pokemon.url.split('/').slice(-2, -1)[0]);
        
        return {
          name: pokemon.name,
          url: pokemon.url,
          id: id,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        };
      });

      setPokemons(pokemonList);
      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar dados. Tente novamente.');
      setLoading(false);
      console.error(err);
    }
  };

  const searchPokemon = async (name: string) => {
    if (!name.trim()) {
      setIsSearching(false);
      fetchPokemons();
      return;
    }

    try {
      setLoading(true);
      setError('');
      setIsSearching(true);

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      );

      if (!response.ok) {
        throw new Error('Pokémon não encontrado');
      }

      const data = await response.json();

      const foundPokemon: Pokemon = {
        name: data.name,
        url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`,
        id: data.id,
        image: data.sprites.other['official-artwork'].front_default,
      };

      setPokemons([foundPokemon]);
      setLoading(false);
    } catch (err) {
      setError('Pokémon não encontrado. Tente outro nome.');
      setPokemons([]);
      setLoading(false);
    }
  };

  const handleSearchChange = (text: string) => {
    setSearchText(text);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      searchPokemon(text);
    }, 500);

    setSearchTimeout(timeout);
  };

  const clearSearch = () => {
    setSearchText('');
    setIsSearching(false);
    setError('');
    fetchPokemons();
  };

  const nextPage = () => {
    setOffset(offset + LIMIT);
  };

  const previousPage = () => {
    if (offset >= LIMIT) {
      setOffset(offset - LIMIT);
    }
  };

  const renderPokemonCard = ({ item }: { item: Pokemon }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.pokemonImage} />
      <Text style={styles.pokemonNumber}>#{item.id.toString().padStart(3, '0')}</Text>
      <Text style={styles.pokemonName}>
        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>Pokédex</Text>
        <Text style={styles.subtitle}>Busque e descubra pokémons</Text>
      </View>

      {/* Campo de Busca */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar pokémon por nome..."
          value={searchText}
          onChangeText={handleSearchChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchText.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Estado de Carregamento */}
      {loading && (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#DC0A2D" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      )}

      {/* Estado de Erro */}
      {error && !loading && (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={clearSearch}>
            <Text style={styles.retryButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Lista de Pokémons */}
      {!loading && !error && pokemons.length > 0 && (
        <FlatList
          data={pokemons}
          renderItem={renderPokemonCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.row}
        />
      )}

      {/* Botões de Paginação (apenas quando não está em modo busca) */}
      {!loading && !error && !isSearching && (
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            style={[
              styles.paginationButton,
              offset === 0 && styles.paginationButtonDisabled,
            ]}
            onPress={previousPage}
            disabled={offset === 0}
          >
            <Text
              style={[
                styles.paginationButtonText,
                offset === 0 && styles.paginationButtonTextDisabled,
              ]}
            >
              ← Anterior
            </Text>
          </TouchableOpacity>

          <Text style={styles.pageInfo}>
            Página {Math.floor(offset / LIMIT) + 1}
          </Text>

          <TouchableOpacity
            style={styles.paginationButton}
            onPress={nextPage}
          >
            <Text style={styles.paginationButtonText}>Próxima →</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#DC0A2D',
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 5,
  },
  searchContainer: {
    margin: 15,
    position: 'relative',
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingRight: 45,
  },
  clearButton: {
    position: 'absolute',
    right: 15,
    top: 12,
    backgroundColor: '#DC0A2D',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#DC0A2D',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#DC0A2D',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    margin: 5,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  pokemonNumber: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  pokemonName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
    textAlign: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  paginationButton: {
    backgroundColor: '#DC0A2D',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  paginationButtonDisabled: {
    backgroundColor: '#CCC',
  },
  paginationButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  paginationButtonTextDisabled: {
    color: '#999',
  },
  pageInfo: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});