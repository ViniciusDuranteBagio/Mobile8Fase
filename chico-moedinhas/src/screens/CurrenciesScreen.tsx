/**
 * Tela principal do aplicativo com listagem de moedas
 */

import React, { useMemo } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Text,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useCurrencies } from '../hooks/useCurrencies';
import { CurrencyCard } from '../components/CurrencyCard';
import { PaginationControls } from '../components/PaginationControls';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { SearchBar } from '../components/SearchBar';
import { COLORS, SPACING } from '../constants/theme';
import { ITEMS_PER_PAGE } from '../constants/api';
import { Currency } from '../types/currency';

export function CurrenciesScreen() {
  const {
    filteredCurrencies,
    loading,
    error,
    currentPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    nextPage,
    prevPage,
    refetch,
  } = useCurrencies();

  // Calcula os dados para a página atual
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredCurrencies.slice(startIndex, endIndex);
  }, [filteredCurrencies, currentPage]);

  // Renderiza cada item da lista
  const renderItem = ({ item }: { item: Currency }) => (
    <View style={styles.cardContainer}>
      <CurrencyCard currency={item} />
    </View>
  );

  // Renderiza o empty state quando não há resultados
  const renderEmptyComponent = () => {
    if (searchTerm.length > 0 && paginatedData.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🔍</Text>
          <Text style={styles.emptyTitle}>Nenhuma moeda encontrada</Text>
          <Text style={styles.emptyMessage}>
            Tente pesquisar por outro termo
          </Text>
        </View>
      );
    }
    return null;
  };

  // Renderiza apenas o resultado info no header
  const renderHeader = () => (
    filteredCurrencies.length > 0 && (
      <View style={styles.resultInfo}>
        <Text style={styles.resultText}>
          {filteredCurrencies.length} moeda{filteredCurrencies.length !== 1 ? 's' : ''} encontrada{filteredCurrencies.length !== 1 ? 's' : ''}
        </Text>
      </View>
    )
  );

  // Se está carregando, mostra o estado de loading
  if (loading) {
    return <LoadingState />;
  }

  // Se houver erro, mostra o estado de erro
  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header com título */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>💰 Chico Moedas</Text>
          <Text style={styles.subtitle}>Cotações em tempo real</Text>
        </View>

        {/* SearchBar fora da lista para não perder foco */}
        <SearchBar
          value={searchTerm}
          onChangeText={setSearchTerm}
          onClear={() => setSearchTerm('')}
        />

        {/* Lista de moedas */}
        <FlatList
          data={paginatedData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.code}-${index}`}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmptyComponent()}
          contentContainerStyle={styles.listContainer}
          scrollEnabled={true}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={refetch}
              colors={[COLORS.primary]}
            />
          }
        />

        {/* Controles de paginação */}
        {filteredCurrencies.length > 0 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={prevPage}
            onNext={nextPage}
          />
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.primaryLight,
  },
  listContainer: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  cardContainer: {
    marginBottom: SPACING.sm,
  },
  resultInfo: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.surfaceLight,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  resultText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  emptyMessage: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
