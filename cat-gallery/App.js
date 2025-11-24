import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";

const API_KEY = "live_rstrTtQNhzvxDSpwNJbnjRDQ4CX7nebShVEaniJXKwoWW3UhWOi4O5DMhToF2DuK";
const BASE_URL = "https://api.thecatapi.com/v1";

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const [limit] = useState(8);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [breedQuery, setBreedQuery] = useState("");
  const [selectedBreedId, setSelectedBreedId] = useState(null);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    fetchImages();
  }, [page, selectedBreedId]);

  async function fetchImages() {
    setLoading(true);
    setError("");
    setIsLastPage(false);

    try {
      const params = new URLSearchParams({
        limit: String(limit),
        page: String(page),
        order: "Desc",
      });
      if (selectedBreedId) params.append("breed_ids", selectedBreedId);

      const url = `${BASE_URL}/images/search?${params.toString()}`;

      const res = await fetch(url, {
        headers: {
          "x-api-key": API_KEY,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      setImages(data);
      setIsLastPage(data.length < limit);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar dados...");
      setImages([]);
    } finally {
      setLoading(false);
    }
  }

  // Buscar raça por texto (usa /breeds/search?q=)
  async function handleSearchBreed() {
    Keyboard.dismiss();
    if (!breedQuery.trim()) {
      setSelectedBreedId(null);
      setPage(0);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const url = `${BASE_URL}/breeds/search?q=${encodeURIComponent(breedQuery.trim())}`;
      const res = await fetch(url, {
        headers: { "x-api-key": API_KEY },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const breeds = await res.json();
      if (breeds.length === 0) {
        setError("Nenhuma raça encontrada com esse termo.");
        setSelectedBreedId(null);
        setImages([]);
      } else {
        setSelectedBreedId(breeds[0].id);
        setPage(0);
      }
    } catch (err) {
      console.error(err);
      setError("Erro ao buscar raça.");
    } finally {
      setLoading(false);
    }
  }

  function renderItem({ item }) {
    const breedName = item.breeds && item.breeds.length ? item.breeds[0].name : "—";
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.url }} style={styles.image} resizeMode="cover" />
        <View style={styles.cardFooter}>
          <Text style={styles.breedText}>{breedName}</Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cat Gallery (The Cat API)</Text>

      <View style={styles.searchRow}>
        <TextInput
          value={breedQuery}
          onChangeText={setBreedQuery}
          placeholder="Buscar raça (ex: beng, siamese, ragdoll...)"
          style={styles.input}
          returnKeyType="search"
          onSubmitEditing={handleSearchBreed}
        />
        <Button title="Buscar" onPress={handleSearchBreed} />
      </View>

      <View style={styles.infoRow}>
        <Text>Página: {page + 1}</Text>
        <Text>{selectedBreedId ? `Filtrando: ${selectedBreedId}` : "Filtrando: nenhuma"}</Text>
      </View>

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text>Carregando...</Text>
        </View>
      )}

      {error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        !loading && (
          <FlatList
            data={images}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={() => (
              <View style={styles.center}>
                <Text>Nenhuma imagem para mostrar.</Text>
              </View>
            )}
          />
        )
      )}

      {/* Navegação de páginas */}
      <View style={styles.pagination}>
        <TouchableOpacity
          onPress={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0 || loading}
          style={[styles.pageBtn, page === 0 || loading ? styles.disabledBtn : null]}
        >
          <Text style={styles.pageBtnText}>← Anterior</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setPage((p) => p + 1)}
          disabled={isLastPage || loading}
          style={[styles.pageBtn, isLastPage || loading ? styles.disabledBtn : null]}
        >
          <Text style={styles.pageBtnText}>Próxima →</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.small}>Requisitos: requisição real, useState, useEffect, fetch, loading/erro, listagem, navegação.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 8, textAlign: "center" },
  searchRow: { flexDirection: "row", gap: 8, alignItems: "center", marginBottom: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 8,
  },
  infoRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  listContainer: { paddingBottom: 12 },
  card: {
    flex: 1,
    margin: 6,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f9f9f9",
    minHeight: 160,
  },
  image: { width: "100%", height: 160 },
  cardFooter: { padding: 8 },
  breedText: { fontSize: 14, fontWeight: "500" },
  center: { alignItems: "center", justifyContent: "center", padding: 12 },
  pagination: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  pageBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#222",
  },
  pageBtnText: { color: "#fff", fontWeight: "600" },
  disabledBtn: { backgroundColor: "#999" },
  footer: { marginTop: 10, alignItems: "center" },
  errorText: { color: "red" },
  small: { fontSize: 12, color: "#444" },
});
