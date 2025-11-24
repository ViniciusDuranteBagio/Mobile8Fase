import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

export default function HomeScreen() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCharacters();
  }, [page]);

  const fetchCharacters = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );

      if (!response.ok) throw new Error("Erro ao buscar dados");

      const data = await response.json();
      setCharacters(data.results);
      setTotalPages(data.info.pages);
    } catch (err) {
      setError("Erro ao carregar dados...");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "alive":
        return "#55cc44";
      case "dead":
        return "#d63d2d";
      default:
        return "#9e9e9e";
    }
  };

  const renderCard = ({ item }: { item: Character }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.infoText}>{item.species}</Text>
        <View style={styles.statusBadge}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: getStatusColor(item.status) },
            ]}
          />
          <Text
            style={[styles.statusText, { color: getStatusColor(item.status) }]}
          >
            {item.status}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Personagens — Rick & Morty</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por nome..."
        value={search}
        onChangeText={setSearch}
      />

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchCharacters}
          >
            <Text style={styles.retryButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={filteredCharacters}
            renderItem={renderCard}
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Nenhum personagem encontrado</Text>
            }
          />

          <View style={styles.pagination}>
            <TouchableOpacity
              style={[styles.button, page === 1 && styles.buttonDisabled]}
              onPress={() => setPage(page - 1)}
              disabled={page === 1}
            >
              <Text style={styles.buttonText}>←</Text>
            </TouchableOpacity>

            <Text style={styles.pageNumber}>Página {page}</Text>

            <TouchableOpacity
              style={[
                styles.button,
                page === totalPages && styles.buttonDisabled,
              ]}
              onPress={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              <Text style={styles.buttonText}>→</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
