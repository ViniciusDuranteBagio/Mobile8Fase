import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
});

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface ApiResponse {
  data: Post[];
  total: number;
  page: number;
  pageSize: number;
}

export const fetchPosts = async (
  page: number = 1,
  pageSize: number = 10
): Promise<ApiResponse> => {
  try {
    const startIndex = (page - 1) * pageSize;

    const response = await api.get('/posts');

    const allPosts: Post[] = response.data;
    const paginatedPosts = allPosts.slice(startIndex, startIndex + pageSize);
    const totalPages = Math.ceil(allPosts.length / pageSize);

    return {
      data: paginatedPosts,
      total: allPosts.length,
      page: page,
      pageSize: pageSize,
    };
  } catch (error) {
    throw new Error(
      `Erro ao buscar dados da API: ${
        error instanceof Error ? error.message : 'Erro desconhecido'
      }`
    );
  }
};
