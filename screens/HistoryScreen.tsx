/**
 * Tela - Histórico
 * Tela para exibir histórico de consultas com paginação
 */

import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import Card from '../components/Card';
import { colors, commonStyles, fontSize, spacing } from '../styles/theme';

interface HistoricoItem {
  origem: string;
  destino: string;
  distancia: string;
  data: string;
}

interface HistoryScreenProps {
  onNavigate: (screen: string) => void;
  historico: HistoricoItem[];
}

export default function HistoryScreen({ onNavigate, historico }: HistoryScreenProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  
  // Cálculos de paginação
  const totalPages = Math.ceil(historico.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = historico.slice(startIndex, endIndex);
  
  const handleProximaPagina = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handlePaginaAnterior = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  return (
    <View style={commonStyles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>KMCULATOR</Text>
      </View>
      
      <View style={commonStyles.header}>
        <Text style={commonStyles.title}>Histórico</Text>
        <Text style={commonStyles.subtitle}>
          {historico.length} {historico.length === 1 ? 'consulta realizada' : 'consultas realizadas'}
        </Text>
      </View>
      
      {historico.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>—</Text>
          <Text style={styles.emptyMessage}>Nenhuma consulta realizada</Text>
        </View>
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            data={paginatedData}
            keyExtractor={(item, index) => `${item.data}-${index}`}
            renderItem={({ item }) => (
              <Card
                origem={item.origem}
                destino={item.destino}
                distancia={item.distancia}
                data={item.data}
              />
            )}
            contentContainerStyle={styles.listContent}
          />
          
          {/* Controles de paginação */}
          <View style={styles.paginationContainer}>
            <Button
              title="Anterior"
              onPress={handlePaginaAnterior}
              disabled={currentPage === 1}
              variant="secondary"
              style={styles.paginationButton}
            />
            
            <Text style={styles.pageInfo}>
              {currentPage} / {totalPages}
            </Text>
            
            <Button
              title="Próxima"
              onPress={handleProximaPagina}
              disabled={currentPage === totalPages}
              variant="secondary"
              style={styles.paginationButton}
            />
          </View>
        </View>
      )}
      
      <Button
        title="Voltar"
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xxxl,
  },
  emptyIcon: {
    fontSize: fontSize.xxxl,
    color: colors.text.tertiary,
    marginBottom: spacing.xl,
    fontWeight: '100',
  },
  emptyMessage: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    textAlign: 'center',
    fontWeight: '300',
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: spacing.xl,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.md,
  },
  paginationButton: {
    flex: 1,
    marginVertical: 0,
  },
  pageInfo: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    fontWeight: '300',
    minWidth: 50,
    textAlign: 'center',
  },
  backButton: {
    margin: 0,
    borderRadius: 0,
    borderWidth: 0,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
