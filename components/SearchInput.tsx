/**
 * Componente de busca com sugestões em tempo real
 */

import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { colors, fontSize, spacing } from '../styles/theme';

interface SearchInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  editable?: boolean;
}

interface CidadeSugestao {
  display_name: string;
  name: string;
  cidade: string;
  estado: string;
}

export default function SearchInput({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  editable = true 
}: SearchInputProps) {
  const [sugestoes, setSugestoes] = useState<CidadeSugestao[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSugestoes, setShowSugestoes] = useState(false);

  useEffect(() => {
    if (value.length < 2) {
      setSugestoes([]);
      setShowSugestoes(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        // Buscar todos os municípios do Brasil via API do IBGE
        const response = await fetch(
          'https://servicodados.ibge.gov.br/api/v1/localidades/municipios'
        );
        const data = await response.json();
        
        if (data && data.length > 0) {
          // Filtrar municípios que contenham o texto digitado
          const cidadesFiltradas = data
            .filter((item: any) => 
              item.nome.toLowerCase().includes(value.toLowerCase())
            )
            .slice(0, 5) // Limitar a 5 resultados
            .map((item: any) => ({
              display_name: `${item.nome}, ${item.microrregiao.mesorregiao.UF.nome}, Brasil`,
              name: `${item.nome}, ${item.microrregiao.mesorregiao.UF.sigla}`,
              cidade: item.nome,
              estado: item.microrregiao.mesorregiao.UF.sigla,
              estadoNome: item.microrregiao.mesorregiao.UF.nome
            }));
          
          setSugestoes(cidadesFiltradas);
          setShowSugestoes(cidadesFiltradas.length > 0);
        } else {
          setSugestoes([]);
          setShowSugestoes(false);
        }
      } catch (error) {
        setSugestoes([]);
        setShowSugestoes(false);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [value]);

  const handleSelectSugestao = (sugestao: CidadeSugestao) => {
    onChangeText(sugestao.name);
    setShowSugestoes(false);
    setSugestoes([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.text.tertiary}
          value={value}
          onChangeText={onChangeText}
          editable={editable}
          onFocus={() => {
            if (sugestoes.length > 0) {
              setShowSugestoes(true);
            }
          }}
        />
        {isLoading && (
          <ActivityIndicator 
            size="small" 
            color={colors.text.secondary} 
            style={styles.loader}
          />
        )}
      </View>
      
      {showSugestoes && sugestoes.length > 0 && (
        <View style={styles.sugestoesContainer}>
          <FlatList
            data={sugestoes}
            keyExtractor={(item, index) => `${item.display_name}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.sugestaoItem}
                onPress={() => handleSelectSugestao(item)}
                activeOpacity={0.7}
              >
                <View style={styles.sugestaoContent}>
                  <Text style={styles.cidadeText}>{item.cidade}</Text>
                  <Text style={styles.estadoText}>{item.estado}</Text>
                </View>
              </TouchableOpacity>
            )}
            style={styles.sugestoesList}
            scrollEnabled={true}
            nestedScrollEnabled={true}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: '400',
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    letterSpacing: 0.3,
  },
  inputWrapper: {
    position: 'relative',
    zIndex: 1,
  },
  input: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: 8,
    fontSize: fontSize.md,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text.primary,
  },
  loader: {
    position: 'absolute',
    right: spacing.lg,
    top: '50%',
    marginTop: -10,
  },
  sugestoesContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginTop: spacing.xs,
    maxHeight: 250,
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 20,
  },
  sugestoesList: {
    maxHeight: 250,
  },
  sugestaoItem: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
  },
  sugestaoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cidadeText: {
    fontSize: fontSize.md,
    color: colors.text.primary,
    fontWeight: '400',
    flex: 1,
  },
  estadoText: {
    fontSize: fontSize.sm,
    color: colors.text.tertiary,
    fontWeight: '300',
    marginLeft: spacing.md,
    letterSpacing: 0.5,
  },
});
