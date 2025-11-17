/**
 * Tela - Calcular Distância
 * Tela para entrada de dados e cálculo da distância
 */

import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import SearchInput from '../components/SearchInput';
import { buscarDuasCidades } from '../services/api';
import { colors, commonStyles, fontSize, spacing } from '../styles/theme';
import { formatarDataAtual, haversineDistance } from '../utils/calculations';

interface CalculateScreenProps {
  onNavigate: (screen: string) => void;
  onAddToHistory: (item: any) => void;
}

interface SearchParams {
  origem: string;
  destino: string;
}

interface Resultado {
  origem: string;
  destino: string;
  distancia: string;
  data: string;
}

export default function CalculateScreen({ onNavigate, onAddToHistory }: CalculateScreenProps) {
  const [cidadeOrigem, setCidadeOrigem] = useState('');
  const [cidadeDestino, setCidadeDestino] = useState('');
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultado, setResultado] = useState<Resultado | null>(null);
  
  // useEffect para fazer requisições HTTP
  useEffect(() => {
    if (!searchParams) return;
    
    const calcularDistancia = async () => {
      setIsLoading(true);
      setError(null);
      setResultado(null);
      
      try {
        const { origem, destino } = searchParams;
        
        // Buscar coordenadas das duas cidades (requisições HTTP)
        const dados = await buscarDuasCidades(origem, destino);
        
        // Calcular distância usando Haversine
        const distancia = haversineDistance(
          dados.origem.lat,
          dados.origem.lon,
          dados.destino.lat,
          dados.destino.lon
        );
        
        // Criar resultado
        const novoResultado = {
          origem: dados.origem.display_name,
          destino: dados.destino.display_name,
          distancia: distancia.toFixed(2),
          data: formatarDataAtual(),
        };
        
        setResultado(novoResultado);
        
        // Adicionar ao histórico
        onAddToHistory(novoResultado);
        
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar dados...');
      } finally {
        setIsLoading(false);
      }
    };
    
    calcularDistancia();
  }, [searchParams]);
  
  const handleCalcular = () => {
    if (!cidadeOrigem.trim() || !cidadeDestino.trim()) {
      setError('Por favor, preencha ambas as cidades.');
      return;
    }
    
    setSearchParams({
      origem: cidadeOrigem.trim(),
      destino: cidadeDestino.trim(),
    });
  };
  
  return (
    <View style={commonStyles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>KMCULATOR</Text>
      </View>
      
      <View style={commonStyles.header}>
        <Text style={commonStyles.title}>Calcular Distância</Text>
      </View>
      
      <ScrollView 
        style={styles.scrollContent} 
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          <View style={styles.inputOrigemWrapper}>
            <SearchInput
              label="Cidade de origem"
              placeholder="Digite o nome da cidade..."
              value={cidadeOrigem}
              onChangeText={setCidadeOrigem}
              editable={!isLoading}
            />
          </View>
          
          <View style={styles.inputDestinoWrapper}>
            <SearchInput
              label="Cidade de destino"
              placeholder="Digite o nome da cidade..."
              value={cidadeDestino}
              onChangeText={setCidadeDestino}
              editable={!isLoading}
            />
          </View>
          
          <Button
            title={isLoading ? 'Calculando...' : 'Calcular distância'}
            onPress={handleCalcular}
            disabled={isLoading}
            style={{ marginTop: spacing.xl }}
          />
        </View>
        
        {/* Estado de carregamento */}
        {isLoading && (
          <View style={styles.resultContainer}>
            <ActivityIndicator size="large" color={colors.text.primary} />
            <Text style={styles.loadingText}>Carregando...</Text>
          </View>
        )}
        
        {/* Estado de erro */}
        {error && !isLoading && (
          <View style={[styles.resultContainer, styles.errorContainer]}>
            <Text style={styles.errorIcon}>—</Text>
            <Text style={styles.errorText}>Erro</Text>
            <Text style={styles.errorDetail}>{error}</Text>
          </View>
        )}
        
        {/* Estado de sucesso */}
        {resultado && !isLoading && !error && (
          <View style={[styles.resultContainer, styles.successContainer]}>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Origem</Text>
              <Text style={styles.resultValue}>{resultado.origem}</Text>
            </View>
            
            <View style={styles.separator} />
            
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Destino</Text>
              <Text style={styles.resultValue}>{resultado.destino}</Text>
            </View>
            
            <View style={styles.separator} />
            
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Distância</Text>
              <Text style={styles.distanceValue}>{resultado.distancia} km</Text>
            </View>
            
            <Text style={styles.resultDate}>{resultado.data}</Text>
          </View>
        )}
      </ScrollView>
      
      <Button
        title="← Voltar"
        onPress={() => onNavigate('home')}
        variant="secondary"
        style={styles.backButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  appName: {
    fontSize: fontSize.md,
    fontWeight: '400',
    color: colors.text.primary,
    letterSpacing: 3,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: spacing.xl,
  },
  formContainer: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderRadius: 8,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputOrigemWrapper: {
    zIndex: 2,
    position: 'relative',
  },
  inputDestinoWrapper: {
    zIndex: 1,
    position: 'relative',
  },
  resultContainer: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: fontSize.md,
    color: colors.text.secondary,
    fontWeight: '300',
  },
  errorContainer: {
    alignItems: 'center',
  },
  errorIcon: {
    fontSize: fontSize.xxxl,
    color: colors.error,
    marginBottom: spacing.md,
    fontWeight: '100',
  },
  errorText: {
    fontSize: fontSize.lg,
    fontWeight: '400',
    color: colors.error,
    marginBottom: spacing.sm,
  },
  errorDetail: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    textAlign: 'center',
    fontWeight: '300',
  },
  successContainer: {
    alignItems: 'stretch',
  },
  resultItem: {
    marginVertical: spacing.md,
  },
  resultLabel: {
    fontSize: fontSize.xs,
    fontWeight: '400',
    color: colors.text.tertiary,
    marginBottom: spacing.xs,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  resultValue: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    lineHeight: 20,
    fontWeight: '300',
  },
  distanceValue: {
    fontSize: fontSize.xxxl,
    fontWeight: '200',
    color: colors.text.primary,
    letterSpacing: -1,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  resultDate: {
    fontSize: fontSize.xs,
    color: colors.text.tertiary,
    marginTop: spacing.xl,
    textAlign: 'center',
    fontWeight: '300',
  },
  backButton: {
    margin: 0,
    borderRadius: 0,
    borderWidth: 0,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
