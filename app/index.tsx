import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TextInput, Button, Image, StyleSheet } from 'react-native';

export default function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);
  const [busca, setBusca] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      setErro(false);

      const url = `https://rickandmortyapi.com/api/character/?page=${page}&name=${busca}`;
      const response = await fetch(url);

      if (!response.ok) throw new Error('Erro ao buscar dados');

      const json = await response.json();
      setData(json.results);
    } catch (err) {
      setErro(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, busca]);

  const itemDaApi = ({ item }: { item: any }) => (
  <View style={styles.card}>
    <Image source={{ uri: item.image }} style={styles.img} />
    <Text style={styles.title}>{item.name}</Text>
    <Text>Status: {item.status}</Text>
    <Text>Espécie: {item.species}</Text>
  </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Personagens de Rick e Morty</Text>

      <TextInput
        style={styles.input}
        placeholder="Buscar por nome..."
        value={busca}
        onChangeText={(t) => setBusca(t)}
      />

      {loading && <ActivityIndicator size="large" />}

      {erro && <Text style={styles.erro}>Erro ao carregar dados...</Text>}

      {!loading && !erro && (
        <FlatList
          data={data}
          renderItem={itemDaApi}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      <View style={styles.row}>
        <Button
          title="Página Anterior"
          onPress={() => page > 1 && setPage(page - 1)}
          disabled={page === 1}
        />
        <Text style={styles.page}>Página: {page}</Text>
        <Button title="Próxima Página" onPress={() => setPage(page + 1)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f4f4' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
  },
  img: { width: '100%', height: 200, borderRadius: 10, marginBottom: 10 },
  title: { fontSize: 18, fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 },
  page: { fontSize: 16 },
  erro: { color: 'red', textAlign: 'center', marginBottom: 10 },
});
