import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, Button } from "react-native";
import CharacterCard from "../components/CharacterCard";

export default function CharactersScreen() {
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function loadCharacters() {
    try {
      setLoading(true);
      setError(false);

      const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);

      if (!res.ok) throw new Error("Erro");

      const data = await res.json();
      setCharacters(data.results);

    } catch (e) {
      setError(true);

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCharacters();
  }, [page]);

  return (
    <View style={{ flex: 1, padding: 12 }}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>Erro ao carregar dados…</Text>}

      {!loading && !error && (
        <>
          <FlatList
            data={characters}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <CharacterCard character={item} />}
          />

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
            <Button 
              title="Página Anterior" 
              onPress={() => setPage((p) => p - 1)} 
              disabled={page === 1} 
            />
            <Button 
              title="Próxima Página" 
              onPress={() => setPage((p) => p + 1)} 
            />
          </View>
        </>
      )}
    </View>
  );
}
