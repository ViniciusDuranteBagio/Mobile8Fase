/**
 * Hook customizado para gerenciar moedas com paginação e filtro
 */

import { useState, useEffect } from 'react';
import { Currency } from '../types/currency';
import { fetchAllCurrencies } from '../services/currencyService';
import { ITEMS_PER_PAGE } from '../constants/api';

interface UseCurrenciesReturn {
  currencies: Currency[];
  filteredCurrencies: Currency[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  nextPage: () => void;
  prevPage: () => void;
  refetch: () => Promise<void>;
}

export function useCurrencies(): UseCurrenciesReturn {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [filteredCurrencies, setFilteredCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Busca as moedas da API
   */
  const fetchCurrencies = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllCurrencies();
      setCurrencies(data);
      setFilteredCurrencies(data);
      setCurrentPage(1);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar moedas';
      setError(errorMessage);
      setCurrencies([]);
      setFilteredCurrencies([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Refetch para atualizar os dados
   */
  const refetch = async () => {
    await fetchCurrencies();
  };

  /**
   * Busca moedas quando o componente monta
   */
  useEffect(() => {
    fetchCurrencies();
  }, []);

  /**
   * Filtra as moedas quando o termo de busca muda
   */
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCurrencies(currencies);
    } else {
      const filtered = currencies.filter(
        (currency) =>
          currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          currency.codein.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCurrencies(filtered);
    }
    setCurrentPage(1); // Reset para primeira página ao filtrar
  }, [searchTerm, currencies]);

  // Calcula o total de páginas
  const totalPages = Math.ceil(filteredCurrencies.length / ITEMS_PER_PAGE);

  /**
   * Navega para próxima página
   */
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  /**
   * Navega para página anterior
   */
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return {
    currencies,
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
  };
}
