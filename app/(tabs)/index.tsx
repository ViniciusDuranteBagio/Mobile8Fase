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
  const limit = 21;

  async function loadData(initial = false) {
    if (initial) setLoading(true);
    else setLoadingMore(true);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      const data = await response.json();

      setPokemon(prev => initial ? data.results : [...prev, ...data.results]);
      setOffset(prev => prev + limit);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
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

  const filtered = pokemon.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
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

        <View style={styles.searchBox}>
          <TextInput
            placeholder="Buscar Pokémon..."
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
            style={styles.input}
          />
        </View>
      </View>

      <FlatList
        data={filtered}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <PokemonCard name={item.name} url={item.url} />}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => (
          <View style={{ padding: 16, alignItems: "center" }}>
            {loadingMore ? (
              <ActivityIndicator size="small" />
            ) : (
              <TouchableOpacity
                onPress={() => loadData(false)}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  backgroundColor: "#006EFF",
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: "#fff" }}>Carregar mais</Text>
              </TouchableOpacity>
            )}
          </View>
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
  searchBox: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    fontSize: 15,
    elevation: 3,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
