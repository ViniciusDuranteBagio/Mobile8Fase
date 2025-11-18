import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function Index() {
  const [idPokemon, setIdPokemon] = useState(1);
  const [pokemon, setPokemon] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [textoBusca, setTextoBusca] = useState("");
  const [listaPokemon, setListaPokemon] = useState([]);

  const buscarPokemon = async (idOuNome) => {
    const consulta = typeof idOuNome === 'string' ? idOuNome.toLowerCase() : idOuNome;
    setCarregando(true);
    setErro(null);
    setPokemon(null); 

    try {
      const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${consulta}`);
      if (!resposta.ok) {
        throw new Error("Pokémon não encontrado!");
      }
      const dados = await resposta.json();
      setPokemon(dados);
      setIdPokemon(dados.id); 
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  };

  const buscarListaPokemon = async () => {
    try {
      const resposta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
      const dados = await resposta.json();
      setListaPokemon(dados.results);
    } catch (error) {
      console.error("Erro ao buscar a lista de Pokémon:", error);
    }
  };

  useEffect(() => {
    buscarListaPokemon();
  }, []);

  useEffect(() => {
    buscarPokemon(idPokemon);
  }, [idPokemon]);

  const proximoPokemon = () => {
    setIdPokemon((idAnterior) => idAnterior + 1);
  };

  const pokemonAnterior = () => {
    if (idPokemon > 1) {
      setIdPokemon((idAnterior) => idAnterior - 1);
    }
  };

  const realizarBusca = () => {
    if (textoBusca) {
      buscarPokemon(textoBusca);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar por nome..."
          value={textoBusca}
          onChangeText={setTextoBusca}
        />
        <Button title="Buscar" onPress={realizarBusca} color="#3B4CCA" />
      </View>

      <View style={styles.card}>
        {carregando && <ActivityIndicator size="large" color="#FFDE00" />}
        {erro && <Text style={styles.errorText}>{erro}</Text>}
        {pokemon && (
          <>
            <Image
              style={styles.image}
              source={{ uri: pokemon.sprites.front_default }}
            />
            <Text style={styles.name}>
              #{pokemon.id} - {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </Text>
          </>
        )}
      </View>

      <View style={styles.navigation}>
        <Button
          title="Anterior"
          onPress={pokemonAnterior}
          disabled={idPokemon <= 1 || carregando}
          color="#FF0000"
        />
        <Button
          title="Próximo"
          onPress={proximoPokemon}
          disabled={carregando}
          color="#FF0000"
        />
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Lista Rápida</Text>
        <FlatList
          data={listaPokemon}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.listItem} onPress={() => buscarPokemon(item.name)}>
              <Text style={styles.listItemText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.name}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20, backgroundColor: '#f0f0f0' },
  searchContainer: { flexDirection: "row", width: '100%', marginTop: 10 },
  input: { flex: 1, borderColor: "gray", borderWidth: 1, marginRight: 10, paddingHorizontal: 10, borderRadius: 5, backgroundColor: 'white' },
  card: { flex: 1, alignItems: "center", justifyContent: "center", minHeight: 250, width: '100%' },
  image: { width: 200, height: 200 },
  name: { fontSize: 24, fontWeight: "bold", marginTop: 10, textTransform: 'capitalize' },
  errorText: { color: "red", fontSize: 18 },
  navigation: { flexDirection: "row", justifyContent: "space-around", width: "100%", marginTop: 20, marginBottom: 20 },
  listContainer: { width: '100%', height: 100, borderTopColor: '#ccc', borderTopWidth: 1, paddingTop: 10 },
  listTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  listItem: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  listItemText: { textTransform: 'capitalize', fontWeight: '500' },
});
