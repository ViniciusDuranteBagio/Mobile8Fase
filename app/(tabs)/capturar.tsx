import { useRef, useState } from 'react';
import { ActivityIndicator, Alert, Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Pokemon } from '../../types/pokemon';
import { fetchPokemon, getRandomPokemonId } from '../../utils/api';
import { addCaptured, addToPokedex } from '../../utils/storage';

export default function CapturarScreen() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [pokebolas, setPokebolas] = useState(5);
  const [capturando, setCapturando] = useState(false);
  const [mostrarPokebola, setMostrarPokebola] = useState(false);
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const buscarPokemon = async () => {
    setLoading(true);
    try {
      const randomId = getRandomPokemonId();
      const data = await fetchPokemon(randomId);
      setPokemon(data);
      setPokebolas(5); // Reseta pokébolas ao buscar novo pokémon
      await addToPokedex(data); // Adiciona à Pokédex quando aparece
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar o pokémon. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const proximoPokemon = async () => {
    await buscarPokemon();
  };

  const animarPokebola = (vezes: number, callback?: () => void) => {
    const animacoes = [];
    
    for (let i = 0; i < vezes; i++) {
      animacoes.push(
        Animated.sequence([
          Animated.timing(shakeAnimation, {
            toValue: 10,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnimation, {
            toValue: -10,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnimation, {
            toValue: 10,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnimation, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
        ])
      );
      
      // Adiciona cooldown entre animações (exceto na última)
      if (i < vezes - 1) {
        animacoes.push(
          Animated.delay(400)
        );
      }
    }

    Animated.sequence(animacoes).start(() => {
      if (callback) {
        callback();
      }
    });
  };

  const tentarCapturar = async () => {
    if (!pokemon) return;
    
    if (pokebolas <= 0) {
      Alert.alert('Pokébolas esgotadas', 'O pokémon fugiu! Procure outro pokémon.');
      return;
    }

    setCapturando(true);
    setMostrarPokebola(true);
    const novaQuantidade = pokebolas - 1;
    setPokebolas(novaQuantidade);

    // 20% de chance de capturar
    const sucesso = Math.random() < 0.2;

    // Se capturar: balançar 3 vezes, se não: 1 ou 2 vezes aleatoriamente
    const vezesBalanco = sucesso ? 3 : Math.floor(Math.random() * 2) + 1;

    animarPokebola(vezesBalanco, async () => {
      setCapturando(false);
      setMostrarPokebola(false);
      
      if (sucesso) {
        await addCaptured(pokemon);
        Alert.alert('Sucesso!', `Você capturou ${pokemon.name}!`, [
          { text: 'OK', onPress: () => buscarPokemon() }
        ]);
      } else if (novaQuantidade === 0) {
        Alert.alert('Pokébolas esgotadas', 'O pokémon fugiu! Procure outro pokémon.');
      } else {
        Alert.alert('Falhou', `O pokémon escapou! Restam ${novaQuantidade} pokébola(s).`);
      }
    });
  };

  const spin = shakeAnimation.interpolate({
    inputRange: [-10, 0, 10],
    outputRange: ['-10deg', '0deg', '10deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : pokemon ? (
          <>
            {mostrarPokebola ? (
              <Animated.View
                style={[
                  styles.pokebolaContainer,
                  { transform: [{ rotate: spin }] }
                ]}
              >
                <Image 
                  source={require('../../assets/images/pokeball.png')} 
                  style={styles.pokebolaImage}
                />
              </Animated.View>
            ) : (
              <Image 
                source={{ uri: pokemon.sprites.front_default }} 
                style={styles.pokemonImage}
              />
            )}
            <Text style={styles.pokemonName}>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </Text>
            <Text style={styles.pokemonId}>#{pokemon.id}</Text>
            <Text style={styles.pokebolasText}>
              Pokébolas: {pokebolas}
            </Text>
          </>
        ) : (
          <Text style={styles.placeholderText}>
            Procure um pokémon para começar!
          </Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.buttonPrimary]}
          onPress={pokemon ? proximoPokemon : buscarPokemon}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {pokemon ? 'Próximo' : 'Procurar pokémon'}
          </Text>
        </TouchableOpacity>

        {pokemon && (
          <TouchableOpacity 
            style={[
              styles.button, 
              styles.buttonCapture,
              (pokebolas === 0 || capturando) && styles.buttonDisabled
            ]}
            onPress={tentarCapturar}
            disabled={pokebolas === 0 || capturando || loading}
          >
            {capturando ? (
              <View style={styles.buttonContent}>
                <Image 
                  source={require('../../assets/images/pokeball.png')} 
                  style={styles.buttonPokebolaIcon}
                />
                <Text style={styles.buttonText}>Capturando...</Text>
              </View>
            ) : (
              <View style={styles.buttonContent}>
                <Image 
                  source={require('../../assets/images/pokeball.png')} 
                  style={styles.buttonPokebolaIcon}
                />
                <Text style={styles.buttonText}>Capturar</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pokemonImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  pokebolaContainer: {
    width: 200,
    height: 200,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pokebolaImage: {
    width: 60,
    height: 60,
  },
  pokemonName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  pokemonId: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  pokebolasText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#007AFF',
    marginTop: 10,
  },
  placeholderText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 15,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  buttonPrimary: {
    backgroundColor: '#007AFF',
  },
  buttonCapture: {
    backgroundColor: '#FF3B30',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  buttonPokebolaIcon: {
    width: 24,
    height: 24,
  },
});

