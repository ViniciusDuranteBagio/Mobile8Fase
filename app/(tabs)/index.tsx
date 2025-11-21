import { get } from '@/services/api';
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [digimon, setDigimon] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function buscaDigimon() {
    try {
      setLoading(true);
      setError(null);
      const data = await get('/digimon/60');
      setDigimon(data);
      console.log('Digimon:', data);
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar digimon');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    buscaDigimon();
  }, []);

  return (
    <View style={styles.screen}>
      {loading && <Text>Carregando...</Text>}
      {error && <Text style={styles.error}>Erro: {error}</Text>}
      {digimon && (
        <View style={styles.screen}>
          <View style={styles.collumn}>
            <Text style={styles.text}>{digimon.id} - {digimon.name}</Text>
            <Text style={styles.digimonText}>{digimon.descriptions[1].description}</Text>
          </View>
          <View style={styles.collumn}>
            <Image
          style={{height:500, width:500}}
            source={{
              uri: digimon.images[0].href,
            }}
          />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  collumn: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  digimonContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
  },
  digimonText: {
    fontSize: 14,
  },
  error: {
    color: 'red',
    marginTop: 10,
  }
});