import { get } from '@/services/api';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface DigimonDetails {
  id: number;
  name: string;
  xAntibody: boolean;
  images: Array<{
    href: string;
    transparent: boolean;
  }>;
  levels: Array<{
    id: number;
    level: string;
  }>;
  types: Array<{
    id: number;
    type: string;
  }>;
  attributes: Array<{
    id: number;
    attribute: string;
  }>;
  fields: Array<{
    id: number;
    field: string;
    image: string;
  }>;
  descriptions: Array<{
    origin: string;
    language: string;
    description: string;
  }>;
}

export default function DigimonDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [digimon, setDigimon] = useState<DigimonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchDigimon(id:any) {
      try {
        console.log('inicinado try')
        setLoading(true);
        console.log('inicinado try')
        const data: DigimonDetails = await get(`/digimon/${id}`);
        setDigimon(data);
      } catch (err: any) {
        console.log('errro')
        console.log(err)
        setError(err.message || 'Erro ao buscar detalhes do digimon');
      } finally {
        console.log('finally')
        setLoading(false);
      }
    }

  useEffect(() => {
    if (id) {
      fetchDigimon(id);
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FF6B35" />
        <Text style={styles.loadingText}>Carregando detalhes...</Text>
      </View>
    );
  }

  if (error || !digimon) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.error}>{error || 'Digimon não encontrado'}</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const mainImage = digimon.images.find(img => img.transparent) || digimon.images[0];
  const description = digimon.descriptions.find(d => d.language === 'en_us') || digimon.descriptions[0];

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBackButton} onPress={() => router.back()}>
          <Text style={styles.headerBackText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{digimon.name}</Text>
        <View style={styles.idBadge}>
          <Text style={styles.idText}>#{digimon.id}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageCard}>
          <Image
            style={styles.mainImage}
            source={{ uri: mainImage.href }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.stats}>
            {digimon.levels.length > 0 && (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Nível</Text>
                <View style={styles.tagContainer}>
                {digimon.levels.map((level) => (
                    <View key={level.id} style={[styles.tag, styles.levelTag]}>
                    <Text style={styles.tagText}>{level.level}</Text>
                    </View>
                ))}
                </View>
            </View>
            )}

            {digimon.types.length > 0 && (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Tipo</Text>
                <View style={styles.tagContainer}>
                {digimon.types.map((type) => (
                    <View key={type.id} style={[styles.tag, styles.typeTag]}>
                    <Text style={styles.tagText}>{type.type}</Text>
                    </View>
                ))}
                </View>
            </View>
            )}

            {digimon.attributes.length > 0 && (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Atributo</Text>
                <View style={styles.tagContainer}>
                {digimon.attributes.map((attr) => (
                    <View key={attr.id} style={[styles.tag, styles.attributeTag]}>
                    <Text style={styles.tagText}>{attr.attribute}</Text>
                    </View>
                ))}
                </View>
            </View>
            )}
        </View>

        {digimon.fields.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Fields</Text>
            <View style={styles.fieldsContainer}>
              {digimon.fields.map((field) => (
                <View key={field.id} style={styles.fieldCard}>
                  <Image
                    style={styles.fieldImage}
                    source={{ uri: field.image }}
                    resizeMode="contain"
                  />
                  <Text style={styles.fieldText}>{field.field}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descrição</Text>
            <View style={styles.descriptionCard}>
              <Text style={styles.descriptionText}>{description.description}</Text>
              <Text style={styles.descriptionOrigin}>Fonte: {description.origin}</Text>
            </View>
          </View>
        )}

        {digimon.xAntibody && (
          <View style={styles.xAntibodyBanner}>
            <Text style={styles.xAntibodyText}>⚡ X-Antibody</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F9FA',
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
    justifyContent: 'center',
    flexDirection: 'row'
  },
  headerBackButton: {
    padding: 8,
  },
  headerBackText: {
    fontFamily: "PressStart2P",
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontFamily: "PressStart2P",
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  idBadge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  idText: {
    fontFamily: "PressStart2P",
    color: '#FF6B35',
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  imageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  mainImage: {
    width: 250,
    height: 250,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: "PressStart2P",
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 12,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  levelTag: {
    backgroundColor: '#3498DB',
  },
  typeTag: {
    backgroundColor: '#9B59B6',
  },
  attributeTag: {
    backgroundColor: '#E74C3C',
  },
  tagText: {
    fontFamily: "PressStart2P",
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  fieldsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  fieldCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  fieldImage: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  fieldText: {
    fontSize: 12,
    color: '#2D3436',
    textAlign: 'center',
  },
  descriptionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2D3436',
    marginBottom: 12,
  },
  descriptionOrigin: {
    fontSize: 12,
    color: '#95A5A6',
    fontStyle: 'italic',
  },
  xAntibodyBanner: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  xAntibodyText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  error: {
    color: '#E74C3C',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});