import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { getCaptured, removeCaptured } from '../../utils/storage';
import { Pokemon } from '../../types/pokemon';

export default function MeusPokemonsScreen() {
  const [captured, setCaptured] = useState<Pokemon[]>([]);
  const [filteredCaptured, setFilteredCaptured] = useState<Pokemon[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  const loadCaptured = async () => {
    setLoading(true);
    try {
      const data = await getCaptured();
      setCaptured(data);
      setFilteredCaptured(data);
    } catch (error) {
      console.error('Erro ao carregar pokémons capturados:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadCaptured();
    }, [])
  );

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredCaptured(captured);
    } else {
      const filtered = captured.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredCaptured(filtered);
    }
  }, [searchText, captured]);

  const handleLibertar = (pokemon: Pokemon, filteredIndex: number) => {
    Alert.alert(
      'Libertar pokémon',
      `Tem certeza que deseja libertar ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Libertar',
          style: 'destructive',
          onPress: async () => {
            // Se há busca, encontrar o índice no array original baseado na posição filtrada
            let indexToRemove: number;
            
            if (searchText.trim() === '') {
              indexToRemove = filteredIndex;
            } else {
              // Encontrar todos os índices que correspondem ao filtro
              const matchingIndices: number[] = [];
              captured.forEach((p, i) => {
                if (p.name.toLowerCase().includes(searchText.toLowerCase())) {
                  matchingIndices.push(i);
                }
              });
              // Usar o índice filtrado para encontrar o índice real
              indexToRemove = matchingIndices[filteredIndex];
            }
            
            if (indexToRemove !== undefined && indexToRemove !== -1) {
              await removeCaptured(indexToRemove);
              await loadCaptured();
            }
          },
        },
      ]
    );
  };

  const renderPokemon = ({ item, index }: { item: Pokemon; index: number }) => (
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
      <TouchableOpacity
        style={styles.libertarButton}
        onPress={() => handleLibertar(item, index)}
      >
        <Text style={styles.libertarButtonText}>Libertar</Text>
      </TouchableOpacity>
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
      
      {filteredCaptured.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>
            {captured.length === 0 
              ? 'Você ainda não capturou nenhum pokémon. Vá capturar alguns!' 
              : 'Nenhum pokémon encontrado com esse nome.'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredCaptured}
          renderItem={renderPokemon}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          contentContainerStyle={styles.list}
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
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  pokemonImage: {
    width: 80,
    height: 80,
    marginRight: 15,
  },
  pokemonInfo: {
    flex: 1,
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textTransform: 'capitalize',
    marginBottom: 5,
  },
  pokemonId: {
    fontSize: 14,
    color: '#666',
  },
  libertarButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  libertarButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
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

