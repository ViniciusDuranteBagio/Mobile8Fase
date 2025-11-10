import axios from 'axios';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function ApiScreen() {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [todoAxios, setTodoAxios] = useState<Todo | null>(null);
  const [loadingAxios, setLoadingAxios] = useState(true);
  const [errorAxios, setErrorAxios] = useState<string | null>(null);

//   useEffect(() => {
//     fetch('https://jsonplaceholder.typicode.com/todos/1')
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Erro ao buscar dados');
//         }
//         return response.json() as Promise<Todo>;
//       })
//       .then((data) => {
//         setTodo(data);
//       })
//       .catch((err) => {
//         setError(err.message);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

  async function carregarDados() {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
      const json = await response.json();
      setTodo(json);
      setLoading(false);
    } catch (error) {
      setError(error as string);
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  useEffect(() => {
    axios
      .get<Todo>('https://jsonplaceholder.typicode.com/todos/2')
      .then((response) => {
        setTodoAxios(response.data);
      })
      .catch((err: Error) => {
        setErrorAxios(err.message);
      })
      .finally(() => {
        setLoadingAxios(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exemplo com Fetch</Text>
      {loading && <ActivityIndicator size="large" color="#000" />}
      {error && <Text style={styles.error}>{error}</Text>}
      {todo && (
        <View style={styles.card}>
          <Text style={styles.label}>ID: {todo.id}</Text>
          <Text style={styles.label}>Título:</Text>
          <Text style={styles.value}>{todo.title}</Text>
          <Text style={styles.label}>
            Concluído: {todo.completed ? 'Sim' : 'Não'}
          </Text>
        </View>
      )}

      <Text style={styles.title}>Exemplo com Axios</Text>
      {loadingAxios && <ActivityIndicator size="large" color="#000" />}
      {errorAxios && <Text style={styles.error}>{errorAxios}</Text>}
      {todoAxios && (
        <View style={styles.card}>
          <Text style={styles.label}>ID: {todoAxios.id}</Text>
          <Text style={styles.label}>Título:</Text>
          <Text style={styles.value}>{todoAxios.title}</Text>
          <Text style={styles.label}>
            Concluído: {todoAxios.completed ? 'Sim' : 'Não'}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 16,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  error: {
    color: '#d00',
  },
  card: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    gap: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  label: {
    fontWeight: '600',
  },
  value: {
    fontStyle: 'italic',
  },
});
