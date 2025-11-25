import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import Card from "../../components/card";

export default function RickScreen() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  async function loadCharacters() {
    try {
      setLoading(true);
      setError(false);

      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );

      if (!response.ok) {
        setError(true);
        setData([]);
        return;
      }

      const json = await response.json();

      if (!json.results) {
        setData([]);
        return;
      }

      setData(json.results);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCharacters();
  }, [page]);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rick and Morty Characters</Text>

      {/* Campo de busca */}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar personagem..."
        value={search}
        onChangeText={(t) => setSearch(t)}
      />

      {loading && <ActivityIndicator size="large" color="green" />}
      {error && <Text style={styles.error}>Erro ao carregar dados...</Text>}

      {!loading && !error && (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Card item={item} />}
        />
      )}

      <View style={styles.pagination}>
        <TouchableOpacity
          style={[styles.button, page === 1 && styles.buttonDisabled]}
          onPress={() => page > 1 && setPage(page - 1)}
          disabled={page === 1}
        >
          <Text style={styles.buttonText}>Página Anterior</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setPage(page + 1)}
        >
          <Text style={styles.buttonText}>Próxima Página</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 15
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold"
  },
  searchInput: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    elevation: 2
  },
  error: {
    color: "red",
    textAlign: "center",
    marginVertical: 20
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20
  },
  button: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 8
  },
  buttonDisabled: {
    backgroundColor: "#888"
  },
  buttonText: {
    color: "white",
    fontWeight: "bold"
  }
});
