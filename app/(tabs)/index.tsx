// app/(tabs)/index.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Digimon {
  name: string;
  img: string;
  level: string;
}

const PAGE_SIZE = 12;

export default function HomeScreen() {
  const [digimons, setDigimons] = useState<Digimon[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchDigimons();
  }, []);

  async function fetchDigimons() {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await fetch(
        "https://digimon-api.vercel.app/api/digimon"
      );

      if (!response.ok) {
        throw new Error("Erro na resposta da API");
      }

      const data: Digimon[] = await response.json();

      setDigimons(data || []);
      setPage(1);
    } catch (error) {
      console.log(error);
      setErrorMessage("Erro ao carregar dados...");
    } finally {
      setLoading(false);
    }
  }

  const filteredDigimons = useMemo(() => {
    const term = searchText.trim().toLowerCase();

    if (!term) {
      return digimons;
    }

    return digimons.filter((d) => d.name?.toLowerCase().includes(term));
  }, [searchText, digimons]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredDigimons.length / PAGE_SIZE)
  );

  const currentPageData = filteredDigimons.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  function handleNextPage() {
    setPage((prev) => {
      if (prev >= totalPages) return prev;
      return prev + 1;
    });
  }

  function handlePreviousPage() {
    setPage((prev) => {
      if (prev <= 1) return prev;
      return prev - 1;
    });
  }

  function handleChangeSearch(text: string) {
    setSearchText(text);
    setPage(1);
  }

  function renderDigimon({ item }: { item: Digimon }) {
    return (
      <View style={styles.card}>
        <Image
          source={{ uri: item.img }}
          style={styles.digimonImage}
          resizeMode="contain"
        />
        <View style={styles.cardInfo}>
          <Text style={styles.digimonName}>{item.name}</Text>

          <View style={styles.levelBadge}>
            <Text style={styles.levelBadgeText}>{item.level}</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.appTitle}>Digidex</Text>
        <Text style={styles.appSubtitle}>
          Lista de Digimon consumindo dados reais da API
        </Text>

        <View style={styles.searchContainer}>
          <Text style={styles.sectionTitle}>Buscar</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar Digimon pelo nome..."
            placeholderTextColor="#9ca3af"
            value={searchText}
            onChangeText={handleChangeSearch}
          />
        </View>

        {loading && (
          <View style={styles.center}>
            <ActivityIndicator size="large" />
            <Text style={styles.statusText}>Carregando...</Text>
          </View>
        )}

        {!loading && errorMessage ? (
          <View style={styles.center}>
            <Text style={styles.errorText}>{errorMessage}</Text>

            <TouchableOpacity
              style={styles.reloadButton}
              onPress={fetchDigimons}
            >
              <Text style={styles.reloadButtonText}>Tentar novamente</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {!loading && !errorMessage && (
          <>
            <Text style={styles.sectionTitle}>Resultados</Text>

            <FlatList
              data={currentPageData}
              keyExtractor={(item, index) => `${item.name}-${index}`}
              renderItem={renderDigimon}
              contentContainerStyle={styles.listContent}
            />

            <View style={styles.paginationContainer}>
              <TouchableOpacity
                style={[
                  styles.pageButton,
                  page === 1 && styles.pageButtonDisabled,
                ]}
                onPress={handlePreviousPage}
                disabled={page === 1}
              >
                <Text style={styles.pageButtonText}>Página Anterior</Text>
              </TouchableOpacity>

              <Text style={styles.pageInfo}>
                Página {page} de {totalPages}
              </Text>

              <TouchableOpacity
                style={[
                  styles.pageButton,
                  page === totalPages && styles.pageButtonDisabled,
                ]}
                onPress={handleNextPage}
                disabled={page === totalPages}
              >
                <Text style={styles.pageButtonText}>Próxima Página</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
  },
  inner: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    maxWidth: 900,
    width: "100%",
    alignSelf: "center",
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#e5e7eb",
    textAlign: "center",
  },
  appSubtitle: {
    fontSize: 14,
    color: "#9ca3af",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e5e7eb",
    marginBottom: 6,
  },
  searchContainer: {
    marginBottom: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#f9fafb",
    backgroundColor: "#020617",
  },
  center: {
    alignItems: "center",
    marginTop: 24,
  },
  statusText: {
    marginTop: 8,
    color: "#9ca3af",
  },
  errorText: {
    color: "#f97373",
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 16,
    marginBottom: 12,
  },
  reloadButton: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#38bdf8",
  },
  reloadButtonText: {
    color: "#020617",
    fontWeight: "600",
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 80,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#020617",
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#111827",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  digimonImage: {
    width: 60,
    height: 60,
    marginRight: 12,
    borderRadius: 999,
    backgroundColor: "#020617",
  },
  cardInfo: {
    flex: 1,
    justifyContent: "center",
  },
  digimonName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#e5e7eb",
    marginBottom: 4,
  },
  levelBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#0ea5e9",
  },
  levelBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0b1120",
  },
  paginationContainer: {
    borderTopWidth: 1,
    borderTopColor: "#111827",
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  pageButton: {
    borderWidth: 1,
    borderColor: "#38bdf8",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  pageButtonDisabled: {
    opacity: 0.4,
  },
  pageButtonText: {
    color: "#38bdf8",
    fontSize: 12,
    fontWeight: "500",
  },
  pageInfo: {
    color: "#e5e7eb",
    fontSize: 14,
  },
});
