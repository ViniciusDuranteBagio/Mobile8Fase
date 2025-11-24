import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import CharacterCard from "./components/CharacterCard";
import PaginationControls from "./components/PaginationControls";

const BASE_URL = "https://rickandmortyapi.com/api/character";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [pageInfo, setPageInfo] = useState({}); // { count, pages, next, prev }
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCharacters = async (pageNumber = 1, name = "") => {
    setLoading(true);
    setError(null);
    try {
      const url = `${BASE_URL}?page=${pageNumber}${name ? `&name=${encodeURIComponent(name)}` : ""}`;
      const res = await fetch(url);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Status ${res.status}: ${text}`);
      }
      const json = await res.json();
      setCharacters(json.results || []);
      setPageInfo(json.info || {});
    } catch (err) {
      if (err.message && err.message.includes("404")) {
        setCharacters([]);
        setPageInfo({});
        setError("Nenhum resultado encontrado para sua pesquisa.");
      } else {
        setError("Erro ao carregar dados. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCharacters(page, query);
  }, [page, query]);

  const handleNext = () => {
    if (pageInfo.next) setPage((p) => p + 1);
  };
  const handlePrev = () => {
    if (pageInfo.prev) setPage((p) => Math.max(1, p - 1));
  };
  const handleSearchSubmit = () => {
    setPage(1);
  };
  const handleClearSearch = () => {
    setQuery("");
    setPage(1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Rick and Morty — Personagens</Text>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar por nome..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearchSubmit}
          style={styles.searchInput}
          returnKeyType="search"
        />
        {query ? (
          <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text>Carregando...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={characters}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <CharacterCard character={item} />}
            contentContainerStyle={styles.list}
            ListEmptyComponent={() => (
              <View style={styles.center}>
                <Text>Nenhum personagem para mostrar.</Text>
              </View>
            )}
          />

          <PaginationControls
            onNext={handleNext}
            onPrev={handlePrev}
            disableNext={!pageInfo.next}
            disablePrev={!pageInfo.prev}
            page={page}
            totalPages={pageInfo.pages}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: "#f7f7fb" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 8, textAlign: "center" },
  searchContainer: { flexDirection: "row", marginBottom: 8, alignItems: "center" },
  searchInput: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  clearButton: { marginLeft: 8, paddingVertical: 8, paddingHorizontal: 12 },
  clearButtonText: { color: "#007AFF" },
  center: { alignItems: "center", justifyContent: "center", padding: 20 },
  errorText: { color: "red" },
  list: { paddingBottom: 12 },
});