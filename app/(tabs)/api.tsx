import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
};

export default function ApiScreen() {
  const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzIxYjBkOGVmZDNhZDhmZGIzOWQ1MDJhNjdlMTgzZSIsIm5iZiI6MTc2MzUxMjc5Ni43NDQsInN1YiI6IjY5MWQxMWRjNTBlYjAxYzc5ZTJlMTdkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UqVEeGANY66H1XnryLIuV8hr9lz151fqNdgxMmScdNY";

  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function carregarFilmes() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao carregar filmes do TMDB");
      }

      const data = await response.json();
      setMovies(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarFilmes();
  }, [page]);

  function getImageUrl(path: string | null) {
    if (!path) return null;
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Text style={styles.title}>🎬 Filmes Populares</Text>

        {loading && <ActivityIndicator size="large" color="#000" />}
        {error && <Text style={styles.error}>{error}</Text>}

        {!loading &&
          !error &&
          movies.map((movie) => (
            <View key={movie.id} style={styles.card}>
              {movie.poster_path ? (
                <Image
                  source={{ uri: getImageUrl(movie.poster_path)! }}
                  style={styles.poster}
                />
              ) : (
                <View style={[styles.poster, styles.noImage]}>
                  <Text style={styles.noImageText}>Sem imagem</Text>
                </View>
              )}

              <Text style={styles.movieTitle}>{movie.title}</Text>
              <Text style={styles.overview}>
                {movie.overview.length > 200
                  ? movie.overview.substring(0, 200) + "..."
                  : movie.overview}
              </Text>
            </View>
          ))}

        <View style={styles.buttons}>
          <TouchableOpacity
            disabled={page === 1}
            style={[styles.btn, page === 1 && styles.btnDisabled]}
            onPress={() => setPage(page - 1)}
          >
            <Text style={styles.btnText}>← Página Anterior</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={() => setPage(page + 1)}>
            <Text style={styles.btnText}>Próxima Página →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: "#f4f4f4" },
  container: { padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginVertical: 16 },
  error: { color: "red", marginBottom: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },
  poster: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 12,
  },
  noImage: {
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    color: "#666",
    fontSize: 16,
  },
  movieTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 6 },
  overview: { fontSize: 14, color: "#444" },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  btn: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
  },
  btnDisabled: {
    backgroundColor: "#999",
  },
  btnText: { color: "#fff", fontSize: 16 },
});
