import PokemonCard from "@/components/PokemonCard";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface Pokemon {
  name: string;
  url: string;
}

export default function HomeScreen() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [searchedPokemon, setSearchedPokemon] = useState<Pokemon | null>(null);
  const limit = 15;

  const filtered = pokemon.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const dataToShow = searchedPokemon ? [searchedPokemon] : filtered;

  async function loadData(initial = false) {
    if (initial) setLoading(true);
    else setLoadingMore(true);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      const data = await response.json();

      setPokemon((prev) => (initial ? data.results : [...prev, ...data.results]));
      setOffset((prev) => prev + limit);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  async function searchPokemon() {
    const name = search.trim();
    if (!name) {
      setSearchedPokemon(null);
      return;
    }

    const found = pokemon.find((p) => p.name.toLowerCase() === name.toLowerCase());
    if (found) {
      setSearchedPokemon(found);
      return;
    }

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      );
      if (!response.ok) {
        setSearchedPokemon(null);
        return;
      }
      const data = await response.json();
      const result: Pokemon = { name: data.name, url: `https://pokeapi.co/api/v2/pokemon/${data.id}/` };
      setSearchedPokemon(result);
    } catch (err) {
      setSearchedPokemon(null);
    }
  }

  useEffect(() => {
    loadData(true);
  }, []);

  if (loading)
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator size="large" />
        <ThemedText>Carregando Pokédex...</ThemedText>
      </ThemedView>
    );

  return (
    <ThemedView style={{ flex: 1, backgroundColor: "#F4F6FB" }}>
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <Image
            source={{ uri: "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" }}
            style={styles.logo}
          />
          <ThemedText style={styles.subtitle}>Explore o mundo Pokémon</ThemedText>
        </View>

        <View style={styles.searchRow}>
          <TextInput
            placeholder="Buscar Pokémon..."
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
            style={styles.input}
          />
          <TouchableOpacity onPress={searchPokemon} style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Buscar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={dataToShow}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <PokemonCard name={item.name} url={item.url} />}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => (
          !searchedPokemon && (
            <View style={{ padding: 16, alignItems: "center" }}>
              {loadingMore ? (
                <ActivityIndicator size="small" />
              ) : (
                <TouchableOpacity
                  onPress={() => loadData(false)}
                  style={styles.loadMoreButton}
                >
                  <Text style={{ color: "#fff" }}>Carregar mais</Text>
                </TouchableOpacity>
              )}
            </View>
          )
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: "#006EFF",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 10,
  },
  header: {
    alignItems: "center",
    paddingTop: 45,
  },
  logo: {
    width: 170,
    height: 75,
    resizeMode: "contain",
  },
  subtitle: {
    marginTop: -8,
    opacity: 0.85,
    fontSize: 15,
    color: "#fff",
    fontWeight: "300",
  },
  searchRow: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    fontSize: 15,
    elevation: 3,
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: "#006EFF",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ffffffff",
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  loadMoreButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#006EFF",
    borderRadius: 10,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
