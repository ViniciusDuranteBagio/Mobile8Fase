import PokemonCard from "@/components/PokemonCard";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, TextInput, View } from "react-native";

interface Pokemon {
  name: string;
  url: string;
}

export default function HomeScreen() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadData() {
    setLoading(true);
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=200");
    const data = await response.json();
    setPokemon(data.results);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
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
            source={{
              uri: "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png",
            }}
            style={styles.logo}
          />
          <ThemedText style={styles.subtitle}>
            Explore o mundo Pokémon
          </ThemedText>
        </View>
      </View>

      <View style={{ flex: 1, marginTop: -65 }}>
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Buscar Pokémon..."
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
            style={styles.input}
          />
        </View>

        <FlatList
          data={filtered}
          numColumns={3}
          columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 5 }}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PokemonCard name={item.name} url={item.url}/>
          )}
          contentContainerStyle={{
            padding: 16,
            paddingBottom: 90,
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: "#006EFF",
    height: 200,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: "relative",
    zIndex: 1,
    elevation: 1,
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
    position: "relative",
    elevation: 2,
    zIndex: 2,
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
