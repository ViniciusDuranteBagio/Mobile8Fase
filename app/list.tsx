import { get } from '@/services/api';
import { useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Digimon {
  id: number;
  name: string;
  image: string;
}

interface DigimonResponse {
  content: Digimon[];
  pageable: {
    currentPage: number;
    elementsOnPage: number;
    totalElements: number;
    totalPages: number;
  };
}

export default function List() {
  const router = useRouter();
  const [digimons, setDigimons] = useState<Digimon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  async function buscaDigimon(page: number = 0) {
    try {
      setLoading(true);
      setError(null);
      
      const data: DigimonResponse = await get(`/digimon?page=${page}`);
      console.log(data);
      setDigimons(data.content);
      setCurrentPage(data.pageable.currentPage);
      setTotalPages(data.pageable.totalPages);
    } catch (err: any) {
      console.log(err);
      setError(err.message || 'Erro ao buscar digimon');
      console.error('Erro:', err);
    } finally {
      console.log('finaly');
      setLoading(false);
    }
  }

  useEffect(() => {
    buscaDigimon();
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      buscaDigimon(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      buscaDigimon(currentPage - 1);
    }
  };

  const handleDigimonPress = (id: number) => {
    router.push(`/digimon/${id}`);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Image style={{width: 300, height: 80, alignSelf: 'center'}} source={{uri: 'https://logos-world.net/wp-content/uploads/2023/04/Digimon-Logo-2001.png'}}></Image>
        <Text style={styles.headerTitle}>Enciclopedia</Text>
      </View>

      {loading && (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Carregando Digimons...</Text>
        </View>
      )}
      
      {error && (
        <View style={styles.centered}>
          <View style={styles.errorContainer}>
            <Text style={styles.errorIcon}>⚠️</Text>
            <Text style={styles.errorTitle}>Ops!</Text>
            <Text style={styles.error}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={() => buscaDigimon(currentPage)}>
              <Text style={styles.retryButtonText}>Tentar Novamente</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      {!loading && !error && digimons.length > 0 && (
        <View style={styles.contentContainer}>
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {digimons.map((digimon) => (
              <TouchableOpacity 
                key={digimon.id} 
                style={styles.digimonCard}
                activeOpacity={0.7}
                onPress={() => handleDigimonPress(digimon.id)}
              >
                <View style={styles.cardContent}>
                  <View style={styles.idBadge}>
                    <Text style={styles.idText}>#{digimon.id}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.digimonName}>{digimon.name}</Text>
                    <Text style={styles.tapHint}>Toque para ver detalhes →</Text>
                  </View>
                </View>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={{ uri: digimon.image }}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          <View style={styles.paginationContainer}>
            <TouchableOpacity 
              style={[
                styles.navButton, 
                currentPage === 0 && styles.navButtonDisabled
              ]}
              onPress={handlePreviousPage}
              disabled={currentPage === 0}
            >
              <Text style={[
                styles.navButtonText,
                currentPage === 0 && styles.navButtonTextDisabled
              ]}>← Voltar</Text>
            </TouchableOpacity>

            <View style={styles.pageIndicator}>
              <Text style={styles.pageText}>
                {currentPage + 1} / {totalPages}
              </Text>
            </View>

            <TouchableOpacity 
              style={[
                styles.navButton,
                currentPage >= totalPages - 1 && styles.navButtonDisabled
              ]}
              onPress={handleNextPage}
              disabled={currentPage >= totalPages - 1}
            >
              <Text style={[
                styles.navButtonText,
                currentPage >= totalPages - 1 && styles.navButtonTextDisabled
              ]}>Avançar →</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    fontFamily: "PressStart2P"
  },
  header: {
    backgroundColor: '#FF6B35',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    justifyContent: 'center'
  },
  headerTitle: {
    fontFamily: "PressStart2P",
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFE5DB',
    textAlign: 'center',
    marginTop: 5,
  },
  contentContainer: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontFamily: "PressStart2P",
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  digimonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  idBadge: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 12,
  },
  idText: {
    color: '#FFFFFF',
    fontFamily: "PressStart2P",
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
  },
  digimonName: {
    fontFamily: "PressStart2P",
    fontSize: 20,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 4,
  },
  tapHint: {
    fontSize: 12,
    color: '#95A5A6',
    fontStyle: 'italic',
  },
  imageContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 70,
    width: 70,
  },
  errorContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    maxWidth: 320,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 8,
  },
  error: {
    color: '#E74C3C',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  navButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 100,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  navButtonDisabled: {
    backgroundColor: '#E8E8E8',
    shadowOpacity: 0,
  },
  navButtonText: {
    color: '#FFFFFF',
    fontFamily: "PressStart2P",
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  navButtonTextDisabled: {
    color: '#B0B0B0',
  },
  pageIndicator: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  pageText: {
    fontSize: 16,
    fontFamily: "PressStart2P",
    fontWeight: '600',
    color: '#2D3436',
  },
});