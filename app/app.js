import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const API_KEY = "SUA_API_KEY_AQUI"; 
// Pegue aqui: https://developer.themoviedb.org/reference/intro/authentication

export default function App() {
  const [filmes, setFilmes] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  const buscarFilmes = async () => {
    try {
      setLoading(true);
      setErro(false);

      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=${pagina}`
      );

      if (!response.ok) {
        throw new Error("Erro na API");
      }

      const data = await response.json();
      setFilmes(data.results);
    } catch (error) {
      setErro(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarFilmes();
  }, [pagina]);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🎬 Filmes Populares</Text>

      {loading && <ActivityIndicator size="large" color="#fff" />}
      {erro && <Text style={styles.erro}>Erro ao carregar dados…</Text>}

      <ScrollView>
        {filmes.map((filme) => (
          <View key={filme.id} style={styles.card}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${filme.poster_path}` }}
              style={styles.poster}
            />
            <View style={styles.info}>
              <Text style={styles.nome}>{filme.title}</Text>
              <Text style={styles.descricao} numberOfLines={4}>
                {filme.overview || "Sem descrição disponível"}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Botões de navegação */}
      <View style={styles.botoes}>
        <TouchableOpacity
          style={[styles.botao, pagina === 1 && { backgroundColor: "#555" }]}
          disabled={pagina === 1}
          onPress={() => setPagina(pagina - 1)}
        >
          <Text style={styles.textoBotao}>Página Anterior</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => setPagina(pagina + 1)}>
          <Text style={styles.textoBotao}>Próxima Página</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    paddingTop: 60,
  },
  titulo: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  erro: {
    color: "#ff4444",
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#222",
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  poster: {
    width: 110,
    height: 160,
  },
  info: {
    flex: 1,
    padding: 10,
  },
  nome: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  descricao: {
    color: "#ccc",
    fontSize: 14,
  },
  botoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  botao: {
    backgroundColor: "#0066ff",
    padding: 12,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },
});
