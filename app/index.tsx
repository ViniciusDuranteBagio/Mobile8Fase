import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useEffect, useMemo, useState } from "react";

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date?: string;
  vote_average?: number;
};

const API_BASE = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function Index() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState("");

  const apiKey = process.env.EXPO_PUBLIC_TMDB_API_KEY;

  const subtitle = useMemo(
    () =>
      query
        ? `Resultados para "${query}"`
        : "Descubra os filmes em destaque no momento",
    [query],
  );

  useEffect(() => {
    const fetchMovies = async () => {
      if (!apiKey) {
        setError(
          "Adicione sua chave TMDB em EXPO_PUBLIC_TMDB_API_KEY para carregar os filmes.",
        );
        return;
      }

      setLoading(true);
      setError(null);

      const endpoint = query ? "/search/movie" : "/movie/popular";
      const params = new URLSearchParams({
        api_key: apiKey,
        language: "pt-BR",
        page: page.toString(),
      });

      if (query) {
        params.append("query", query);
      }

      try {
        const response = await fetch(`${API_BASE}${endpoint}?${params}`);

        if (!response.ok) {
          throw new Error("Resposta invalida da API");
        }

        const data = await response.json();
        setMovies(data.results ?? []);
        setTotalPages(Math.max(data.total_pages ?? 1, 1));
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar dados. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [apiKey, page, query]);

  const handleSearch = () => {
    setPage(1);
    setQuery(searchText.trim());
  };

  const handleClearSearch = () => {
    setSearchText("");
    setQuery("");
    setPage(1);
  };

  const nextDisabled = loading || page >= totalPages;
  const prevDisabled = loading || page <= 1;

  const renderMovie = ({ item }: { item: Movie }) => {
    return (
      <View style={styles.card}>
        {item.poster_path ? (
          <Image
            source={{ uri: `${IMAGE_BASE}${item.poster_path}` }}
            style={styles.poster}
          />
        ) : (
          <View style={[styles.poster, styles.posterFallback]}>
            <Text style={styles.posterFallbackText}>Sem imagem</Text>
          </View>
        )}
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardMeta}>
            {item.release_date ? item.release_date.slice(0, 4) : "Ano N/D"} ·{" "}
            {item.vote_average ? item.vote_average.toFixed(1) : "0.0"}
          </Text>
          <Text style={styles.cardOverview} numberOfLines={3}>
            {item.overview || "Sinopse nao disponivel no TMDB."}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>TMDB Explorer</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <View style={styles.searchRow}>
        <TextInput
          placeholder="Buscar filme por nome"
          placeholderTextColor="#d9d9e6"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          style={styles.input}
          returnKeyType="search"
        />
        <Pressable style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </Pressable>
        {query ? (
          <Pressable style={styles.clearButton} onPress={handleClearSearch}>
            <Text style={styles.clearButtonText}>Limpar</Text>
          </Pressable>
        ) : null}
      </View>

      {loading ? (
        <View style={styles.stateBox}>
          <ActivityIndicator color="#eab308" size="large" />
          <Text style={styles.stateText}>Carregando filmes...</Text>
        </View>
      ) : error ? (
        <View style={styles.stateBox}>
          <Text style={[styles.stateText, styles.errorText]}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovie}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.stateBox}>
              <Text style={styles.stateText}>Nenhum resultado encontrado.</Text>
            </View>
          }
        />
      )}

      <View style={styles.pagination}>
        <Pressable
          onPress={() => setPage((prev) => Math.max(1, prev - 1))}
          style={[
            styles.pageButton,
            prevDisabled && styles.pageButtonDisabled,
          ]}
          disabled={prevDisabled}
        >
          <Text style={styles.pageButtonText}>Pagina anterior</Text>
        </Pressable>
        <Text style={styles.pageIndicator}>
          Pagina {page} de {totalPages}
        </Text>
        <Pressable
          onPress={() => setPage((prev) => prev + 1)}
          style={[
            styles.pageButton,
            nextDisabled && styles.pageButtonDisabled,
          ]}
          disabled={nextDisabled}
        >
          <Text style={styles.pageButtonText}>Proxima pagina</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  header: {
    gap: 4,
    marginBottom: 12,
  },
  title: {
    color: "#f8fafc",
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    color: "#cbd5f5",
    fontSize: 14,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    backgroundColor: "#1f2937",
    color: "#f8fafc",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },
  searchButton: {
    backgroundColor: "#eab308",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },
  searchButtonText: {
    color: "#0f172a",
    fontWeight: "700",
  },
  clearButton: {
    backgroundColor: "#1f2937",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },
  clearButtonText: {
    color: "#f8fafc",
  },
  listContent: {
    paddingBottom: 96,
    gap: 12,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#111827",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  poster: {
    width: 110,
    height: 160,
  },
  posterFallback: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
  },
  posterFallbackText: {
    color: "#cbd5f5",
    fontSize: 12,
    textAlign: "center",
  },
  cardContent: {
    flex: 1,
    padding: 12,
    gap: 6,
  },
  cardTitle: {
    color: "#f8fafc",
    fontSize: 16,
    fontWeight: "700",
  },
  cardMeta: {
    color: "#cbd5f5",
    fontSize: 12,
  },
  cardOverview: {
    color: "#cbd5f5",
    fontSize: 12,
    lineHeight: 16,
  },
  stateBox: {
    alignItems: "center",
    paddingVertical: 32,
    gap: 8,
  },
  stateText: {
    color: "#cbd5f5",
  },
  errorText: {
    color: "#fca5a5",
  },
  pagination: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0b1224",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
    padding: 12,
    gap: 8,
  },
  pageButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#2563eb",
    borderRadius: 12,
  },
  pageButtonDisabled: {
    backgroundColor: "#1e3a8a",
    opacity: 0.6,
  },
  pageButtonText: {
    color: "#f8fafc",
    fontWeight: "700",
    fontSize: 12,
  },
  pageIndicator: {
    color: "#cbd5f5",
    fontSize: 12,
  },
});
