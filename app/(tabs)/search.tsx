import { useEffect, useState } from "react";
import { View, Text, TextInput, ActivityIndicator, FlatList } from "react-native";
import CharacterCard from "../components/CharacterCard";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function search() {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${query}`);
      const data = await res.json();

      setResults(data.results || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => search(), 600);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <TextInput
        placeholder="Buscar personagem…"
        style={{
          borderColor: "#ccc",
          borderWidth: 1,
          padding: 10,
          borderRadius: 8,
          marginBottom: 12
        }}
        value={query}
        onChangeText={setQuery}
      />

      {loading && <ActivityIndicator size="large" />}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CharacterCard character={item} />}
      />

      {!loading && results.length === 0 && query !== "" && (
        <Text>Nenhum personagem encontrado…</Text>
      )}
    </View>
  );
}
