import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PokemonDetails from './PokemonDetails';

interface Pokemon {
  name: string;
  url: string;
  id: number;
  image: string;
  types: string[];
}

interface PokemonDetails {
  id: number;
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
}

export default function Pokedex() {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [displayedPokemons, setDisplayedPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(null);
  const flatListRef = React.useRef<FlatList>(null);
  const itemsPerPage = 30;

  useEffect(() => {
    fetchAllPokemons();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [searchText]);

  useEffect(() => {
    updateDisplayedPokemons();
  }, [page, searchText, allPokemons]);

  const fetchAllPokemons = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=251&offset=0'
      );

      const pokemonDetails = await Promise.all(
        response.data.results.map(async (pokemon: { name: string; url: string }) => {
          const details = await axios.get<PokemonDetails>(pokemon.url);
          return {
            name: pokemon.name,
            url: pokemon.url,
            id: details.data.id,
            image: details.data.sprites.other['official-artwork'].front_default,
            types: details.data.types.map((t) => t.type.name),
          };
        })
      );

      const sortedPokemons = pokemonDetails.sort((a, b) => 
        a.name.localeCompare(b.name)
      );

      setAllPokemons(sortedPokemons);
    } catch (err) {
      setError('Erro ao carregar dados. Tente novamente!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateDisplayedPokemons = () => {
    let pokemonsToDisplay = allPokemons;

    if (searchText.trim() !== '') {
      pokemonsToDisplay = allPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedPokemons = pokemonsToDisplay.slice(startIndex, endIndex);

    setDisplayedPokemons(paginatedPokemons);
  };

  const handleNextPage = () => {
    const filteredCount = searchText.trim() !== '' 
      ? allPokemons.filter((p) => p.name.toLowerCase().includes(searchText.toLowerCase())).length
      : allPokemons.length;
    
    const maxPage = Math.ceil(filteredCount / itemsPerPage) - 1;
    
    if (page < maxPage) {
      setPage((prev) => prev + 1);
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    }
  };

  const getTotalPages = () => {
    const filteredCount = searchText.trim() !== '' 
      ? allPokemons.filter((p) => p.name.toLowerCase().includes(searchText.toLowerCase())).length
      : allPokemons.length;
    
    return Math.ceil(filteredCount / itemsPerPage);
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC',
    };
    return colors[type] || '#68A090';
  };

  const renderPokemonCard = ({ item }: { item: Pokemon }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => setSelectedPokemonId(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.pokemonNumber}>#{item.id.toString().padStart(3, '0')}</Text>
      </View>
      <Image source={{ uri: item.image }} style={styles.pokemonImage} />
      <Text style={styles.pokemonName}>{item.name.toUpperCase()}</Text>
      <View style={styles.typesContainer}>
        {item.types.map((type, index) => (
          <View
            key={index}
            style={[styles.typeTag, { backgroundColor: getTypeColor(type) }]}
          >
            <Text style={styles.typeText}>{type.toUpperCase()}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pokédex</Text>
        <Text style={styles.subtitle}>
          {allPokemons.length} Pokémon{allPokemons.length !== 1 ? 's' : ''} | Página {page + 1}
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar Pokémon por nome..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#FF0000" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchAllPokemons}>
            <Text style={styles.retryButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            ref={flatListRef}
            data={displayedPokemons}
            renderItem={renderPokemonCard}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
              <View style={styles.centerContainer}>
                <Text style={styles.emptyText}>Nenhum Pokémon encontrado</Text>
              </View>
            }
          />

          {displayedPokemons.length > 0 && (
            <View style={styles.navigationContainer}>
              <TouchableOpacity
                style={[styles.navButton, page === 0 && styles.navButtonDisabled]}
                onPress={handlePreviousPage}
                disabled={page === 0}
              >
                <Text style={styles.navButtonText}>← Anterior</Text>
              </TouchableOpacity>

              <Text style={styles.pageIndicator}>
                Página {page + 1} de {getTotalPages()}
              </Text>

              <TouchableOpacity 
                style={[
                  styles.navButton, 
                  page >= getTotalPages() - 1 && styles.navButtonDisabled
                ]}
                onPress={handleNextPage}
                disabled={page >= getTotalPages() - 1}
              >
                <Text style={styles.navButtonText}>Próxima →</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}

      <Modal
        visible={selectedPokemonId !== null}
        animationType="slide"
        onRequestClose={() => setSelectedPokemonId(null)}
      >
        {selectedPokemonId && (
          <PokemonDetails
            pokemonId={selectedPokemonId}
            onClose={() => setSelectedPokemonId(null)}
          />
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FF0000',
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 5,
  },
  searchContainer: {
    padding: 15,
    backgroundColor: '#FFFFFF',
  },
  searchInput: {
    backgroundColor: '#F0F0F0',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
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
    color: '#FF0000',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    margin: 5,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    alignSelf: 'flex-end',
  },
  pokemonNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#999',
  },
  pokemonImage: {
    width: 120,
    height: 120,
    marginVertical: 10,
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  typesContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  typeTag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  navButtonDisabled: {
    backgroundColor: '#CCC',
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  pageIndicator: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
