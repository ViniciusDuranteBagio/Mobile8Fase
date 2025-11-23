import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TextInput, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { getPokedex } from '../../utils/storage';
import { Pokemon } from '../../types/pokemon';

export default function PokedexScreen() {
  const [pokedex, setPokedex] = useState<Pokemon[]>([]);
  const [filteredPokedex, setFilteredPokedex] = useState<Pokemon[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  const loadPokedex = async () => {
    setLoading(true);
    try {
      const data = await getPokedex();
      // Ordenar por ID
      const sorted = data.sort((a, b) => a.id - b.id);
      setPokedex(sorted);
      setFilteredPokedex(sorted);
    } catch (error) {
      console.error('Erro ao carregar Pokédex:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadPokedex();
    }, [])
  );

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredPokedex(pokedex);
    } else {
      const filtered = pokedex.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredPokedex(filtered);
    }
  }, [searchText, pokedex]);

  const renderPokemon = ({ item }: { item: Pokemon }) => (
    <View style={styles.pokemonCard}>
      <Image 
        source={{ uri: item.sprites.front_default }} 
        style={styles.pokemonImage}
      />
      <View style={styles.pokemonInfo}>
        <Text style={styles.pokemonName}>
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>
        <Text style={styles.pokemonId}>#{item.id}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar pokémon..."
        value={searchText}
        onChangeText={setSearchText}
        placeholderTextColor="#999"
      />
      
      {filteredPokedex.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>
            {pokedex.length === 0 
              ? 'Nenhum pokémon visto ainda. Vá capturar alguns!' 
              : 'Nenhum pokémon encontrado com esse nome.'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredPokedex}
          renderItem={renderPokemon}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          numColumns={2}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  list: {
    padding: 10,
  },
  pokemonCard: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  pokemonImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  pokemonInfo: {
    alignItems: 'center',
  },
  pokemonName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textTransform: 'capitalize',
    marginBottom: 5,
  },
  pokemonId: {
    fontSize: 14,
    color: '#666',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

