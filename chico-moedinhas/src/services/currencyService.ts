/**
 * Serviço de requisições HTTP para a API AwesomeAPI
 * Responsável por fazer chamadas à API de moedas e tratar respostas
 */

import { API_BASE_URL, API_ENDPOINTS, API_TIMEOUT } from '../constants/api';
import { CurrencyData, Currency } from '../types/currency';

/**
 * Faz uma requisição HTTP com timeout
 */
async function fetchWithTimeout(url: string, timeout: number = API_TIMEOUT): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * Busca todas as moedas disponíveis
 */
export async function fetchAllCurrencies(): Promise<Currency[]> {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINTS.ALL_CURRENCIES}`;
    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data: CurrencyData = await response.json();

    // Converte o objeto em um array de moedas
    const currencies = Object.values(data);
    return currencies;
  } catch (error) {
    console.error('Erro ao buscar moedas:', error);
    throw error;
  }
}

/**
 * Busca uma moeda específica por código
 */
export async function fetchCurrencyByCode(code: string): Promise<CurrencyData> {
  try {
    const url = `${API_BASE_URL}/${code}`;
    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data: CurrencyData = await response.json();
    return data;
  } catch (error) {
    console.error(`Erro ao buscar moeda ${code}:`, error);
    throw error;
  }
}
