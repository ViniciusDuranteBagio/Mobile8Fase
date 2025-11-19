import axios from 'axios';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

type DogImage = {
  message: string; 
  status: string;
};

export default function ApiScreen() {
  const [dogFetch, setDogFetch] = useState<DogImage | null>(null);
  const [loadingFetch, setLoadingFetch] = useState(true);
  const [errorFetch, setErrorFetch] = useState<string | null>(null);

  const [dogAxios, setDogAxios] = useState<DogImage | null>(null);
  const [loadingAxios, setLoadingAxios] = useState(true);
  const [errorAxios, setErrorAxios] = useState<string | null>(null);

  // --- FETCH ---
  async function carregarComFetch() {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const json: DogImage = await response.json();
      setDogFetch(json);
    } catch (error) {
      setErrorFetch(String(error));
    } finally {
      setLoadingFetch(false);
    }
  }

  // --- AXIOS ---
  async function carregarComAxios() {
    try {
      const response = await axios.get<DogImage>(
        "https://dog.ceo/api/breeds/image/random"
      );
      setDogAxios(response.data);
    } catch (error: any) {
      setErrorAxios(error.message);
    } finally {
      setLoadingAxios(false);
    }
  }

  useEffect(() => {
    carregarComFetch();
    carregarComAxios();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Imagem usando Fetch</Text>

      {loadingFetch && <ActivityIndicator size="large" />}
      {errorFetch && <Text style={styles.error}>{errorFetch}</Text>}

      {dogFetch && (
        <Image
          source={{ uri: dogFetch.message }}
          style={styles.image}
        />
      )}

      <Text style={styles.title}>Imagem usando Axios</Text>

      {loadingAxios && <ActivityIndicator size="large" />}
      {errorAxios && <Text style={styles.error}>{errorAxios}</Text>}

      {dogAxios && (
        <Image
          source={{ uri: dogAxios.message }}
          style={styles.image}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 24,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginTop: 10,
  },
});
