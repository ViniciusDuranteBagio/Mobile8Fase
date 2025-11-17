/**
 * Camada de Serviços - API
 * Responsável por todas as requisições HTTP
 */

const API_BASE_URL = 'https://nominatim.openstreetmap.org';

interface Coordenadas {
  lat: number;
  lon: number;
  display_name: string;
}

/**
 * Busca as coordenadas de uma cidade usando a API Nominatim
 * @param {string} nomeCidade - Nome da cidade a ser buscada
 * @returns {Promise<Coordenadas>} Objeto com lat, lon e display_name
 */
export const buscarCoordenadas = async (nomeCidade: string): Promise<Coordenadas> => {
  try {
    const resposta = await fetch(
      `${API_BASE_URL}/search?format=json&q=${encodeURIComponent(nomeCidade)}`
    );
    
    if (!resposta.ok) {
      throw new Error('Erro na requisição à API');
    }
    
    const dados = await resposta.json();
    
    if (!dados || dados.length === 0) {
      throw new Error(`Cidade "${nomeCidade}" não encontrada`);
    }
    
    return {
      lat: parseFloat(dados[0].lat),
      lon: parseFloat(dados[0].lon),
      display_name: dados[0].display_name,
    };
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao buscar coordenadas');
  }
};

/**
 * Busca as coordenadas de duas cidades (origem e destino)
 * @param {string} cidadeOrigem - Nome da cidade de origem
 * @param {string} cidadeDestino - Nome da cidade de destino
 * @returns {Promise<Object>} Objeto com dados de origem e destino
 */
export const buscarDuasCidades = async (cidadeOrigem: string, cidadeDestino: string) => {
  try {
    // Buscar origem
    const origem = await buscarCoordenadas(cidadeOrigem);
    
    // Buscar destino
    const destino = await buscarCoordenadas(cidadeDestino);
    
    return {
      origem,
      destino,
    };
  } catch (error) {
    throw error;
  }
};
