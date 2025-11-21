import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = 'https://digi-api.com/api/v1';

interface ApiError {
  message: string;
  status?: number;
  data?: any;
}


class DigiApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: any) =>  {
        const apiError: ApiError = {
          message: error.response?.data?.message || error.message || 'Erro na requisição',
          status: error.response?.status,
          data: error.response?.data,
        };
        return Promise.reject(apiError);
      }
    );
  }

  async get<T>(endpoint: string): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(endpoint);
    return response.data;
  }

}

const apiClient = new DigiApiClient();


/**
 * Realizar requisição GET
 * @param endpoint - Endpoint da API
 */
export const get = async <T,>(endpoint: string, config?: AxiosRequestConfig): Promise<T> => {
  return apiClient.get<T>(endpoint);
};



/**
 * Criar nova instância do cliente com autenticação
 */
export const createAuthenticatedClient = (): DigiApiClient => {
  return new DigiApiClient();
};

// Exportar cliente padrão e classe
export { apiClient, DigiApiClient };
export type { ApiError };
export default apiClient;