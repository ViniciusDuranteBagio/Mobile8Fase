import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface PokemonDetailsProps {
  pokemonId: number;
  onClose: () => void;
}

interface PokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
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
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
}

interface SpeciesData {
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
    };
  }>;
  genera: Array<{
    genus: string;
    language: {
      name: string;
    };
  }>;
}

export default function PokemonDetails({ pokemonId, onClose }: PokemonDetailsProps) {
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [species, setSpecies] = useState<SpeciesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPokemonDetails();
  }, [pokemonId]);

  const fetchPokemonDetails = async () => {
    setLoading(true);
    setError('');

    try {
      const pokemonResponse = await axios.get<PokemonData>(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );
      setPokemon(pokemonResponse.data);

      const speciesResponse = await axios.get<SpeciesData>(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
      );
      setSpecies(speciesResponse.data);
    } catch (err) {
      setError('Erro ao carregar detalhes do Pokémon');
      console.error(err);
    } finally {
      setLoading(false);
    }
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

  const getStatName = (statName: string) => {
    const names: { [key: string]: string } = {
      hp: 'HP',
      attack: 'Ataque',
      defense: 'Defesa',
      'special-attack': 'Atq. Esp.',
      'special-defense': 'Def. Esp.',
      speed: 'Velocidade',
    };
    return names[statName] || statName;
  };

  const getStatColor = (value: number) => {
    if (value >= 100) return '#4CAF50';
    if (value >= 70) return '#8BC34A';
    if (value >= 50) return '#FFC107';
    return '#FF5722';
  };

  const getDescription = () => {
    if (!species) return '';
    const entry = species.flavor_text_entries.find(
      (entry) => entry.language.name === 'en'
    );
    return entry ? entry.flavor_text.replace(/\f/g, ' ') : '';
  };

  const getGenus = () => {
    if (!species) return '';
    const genus = species.genera.find((g) => g.language.name === 'en');
    return genus ? genus.genus : '';
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF0000" />
          <Text style={styles.loadingText}>Carregando detalhes...</Text>
        </View>
      </View>
    );
  }

  if (error || !pokemon) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchPokemonDetails}>
            <Text style={styles.retryButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const primaryType = pokemon.types[0].type.name;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>✕</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[styles.header, { backgroundColor: getTypeColor(primaryType) }]}
        >
          <Text style={styles.pokemonNumber}>
            #{pokemon.id.toString().padStart(3, '0')}
          </Text>
          <Text style={styles.pokemonName}>{pokemon.name.toUpperCase()}</Text>
          <Text style={styles.genus}>{getGenus()}</Text>
          <Image
            source={{ uri: pokemon.sprites.other['official-artwork'].front_default }}
            style={styles.pokemonImage}
          />
        </View>

        <View style={styles.typesContainer}>
          {pokemon.types.map((type, index) => (
            <View
              key={index}
              style={[
                styles.typeTag,
                { backgroundColor: getTypeColor(type.type.name) },
              ]}
            >
              <Text style={styles.typeText}>{type.type.name.toUpperCase()}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre</Text>
          <Text style={styles.description}>{getDescription()}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.physicalData}>
            <View style={styles.dataItem}>
              <Text style={styles.dataLabel}>Altura</Text>
              <Text style={styles.dataValue}>{(pokemon.height / 10).toFixed(1)} m</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.dataItem}>
              <Text style={styles.dataLabel}>Peso</Text>
              <Text style={styles.dataValue}>{(pokemon.weight / 10).toFixed(1)} kg</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Habilidades</Text>
          <View style={styles.abilitiesContainer}>
            {pokemon.abilities.map((ability, index) => (
              <View key={index} style={styles.abilityTag}>
                <Text style={styles.abilityText}>
                  {ability.ability.name.replace('-', ' ')}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estatísticas Base</Text>
          {pokemon.stats.map((stat, index) => (
            <View key={index} style={styles.statRow}>
              <Text style={styles.statName}>{getStatName(stat.stat.name)}</Text>
              <Text style={styles.statValue}>{stat.base_stat}</Text>
              <View style={styles.statBarContainer}>
                <View
                  style={[
                    styles.statBar,
                    {
                      width: `${(stat.base_stat / 255) * 100}%`,
                      backgroundColor: getStatColor(stat.base_stat),
                    },
                  ]}
                />
              </View>
            </View>
          ))}
          <View style={styles.totalStatRow}>
            <Text style={styles.totalStatLabel}>Total</Text>
            <Text style={styles.totalStatValue}>
              {pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
            </Text>
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  closeButton: {
    position: 'absolute',
    top: 45,
    right: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF0000',
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
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  pokemonNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  pokemonName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 5,
  },
  genus: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 5,
  },
  pokemonImage: {
    width: 250,
    height: 250,
    marginTop: 10,
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 20,
  },
  typeTag: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 20,
    borderRadius: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  physicalData: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dataItem: {
    alignItems: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: '#E0E0E0',
  },
  dataLabel: {
    fontSize: 14,
    color: '#999',
    marginBottom: 5,
  },
  dataValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  abilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  abilityTag: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  abilityText: {
    fontSize: 14,
    color: '#333',
    textTransform: 'capitalize',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statName: {
    width: 90,
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  statValue: {
    width: 40,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
  },
  statBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginLeft: 10,
    overflow: 'hidden',
  },
  statBar: {
    height: '100%',
    borderRadius: 4,
  },
  totalStatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  totalStatLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF0000',
  },
});
