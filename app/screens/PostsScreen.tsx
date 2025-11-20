import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ErrorComponent } from '../components/ErrorComponent';
import { LoadingComponent } from '../components/LoadingComponent';
import { PaginationControls } from '../components/PaginationControls';
import { PostList } from '../components/PostList';
import { fetchPosts, Post } from '../services/apiService';

export const PostsScreen: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const PAGE_SIZE = 10;

  // Hook useEffect para buscar dados quando a página mudar
  useEffect(() => {
    loadPosts();
  }, [currentPage]);

  // Função para carregar posts usando fetch/axios
  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchPosts(currentPage, PAGE_SIZE);
      setPosts(response.data);
      setTotalPages(Math.ceil(response.total / PAGE_SIZE));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Funções de navegação
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Mostra o componente de carregamento */}
      <LoadingComponent isLoading={loading} />

      {/* Se não está carregando, mostra o conteúdo */}
      {!loading && (
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: 16 }}
        >
          {/* Mostra mensagem de erro se houver */}
          <View style={styles.innerContent}>
            <ErrorComponent error={error} />

            {/* Mostra a lista de posts */}
            {!error && posts.length > 0 && <PostList posts={posts} />}
          </View>
        </ScrollView>
      )}

      {/* Controles de paginação */}
      {!loading && !error && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={handlePreviousPage}
          onNext={handleNextPage}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
  },
  innerContent: {
    padding: 16,
  },
});
