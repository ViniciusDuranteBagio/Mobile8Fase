import { useCallback, useEffect, useState } from "react";
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function IndexScreen() {
  // -----------------------------
  // exercicio 1
  // -----------------------------
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    async function carregarUsuarios() {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
      setLoadingUsers(false);
    }
    carregarUsuarios();
  }, []);

  // -----------------------------
  // exercicoo 2
  // -----------------------------
  const [posts, setPosts] = useState<any[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  const carregarPosts = useCallback(async () => {
    setLoadingPosts(true);
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    setPosts(data.slice(0, 5)); // 5 primeiros
    setLoadingPosts(false);
  }, []);

  useEffect(() => {
    carregarPosts();
  }, [carregarPosts]);

  // -----------------------------
  // exercicio 3
  // -----------------------------
  const [nome, setNome] = useState("");
  const [resultado, setResultado] = useState<any>(null);
  const [erro, setErro] = useState("");

  async function buscarGitHub() {
    setErro("");
    setResultado(null);

    try {
      const res = await fetch(`https://api.github.com/users/${nome}`);

      if (!res.ok) {
        setErro("Usuário não encontrado.");
        return;
      }

      const data = await res.json();
      setResultado(data);
    } catch (err) {
      setErro("Erro ao buscar usuário.");
    }
  }

  return (
    <ScrollView style={styles.container}>
      {/* 1) ------------------------- */}
      <Text style={styles.title}>1) Lista de Usuários (useEffect)</Text>

      {loadingUsers ? (
        <Text>Carregando usuários...</Text>
      ) : (
        users.map((u) => <Text key={u.id}>{u.name}</Text>)
      )}

      {/* 2) ------------------------- */}
      <Text style={styles.title}>2) Posts (useCallback + Recarregar)</Text>

      <Button title="Recarregar" onPress={carregarPosts} />

      {loadingPosts ? (
        <Text>Carregando posts...</Text>
      ) : (
        posts.map((p) => (
          <Text key={p.id} style={styles.postTitle}>
            • {p.title}
          </Text>
        ))
      )}

      {/* 3) ------------------------- */}
      <Text style={styles.title}>3) Buscar Usuário do GitHub</Text>

      <TextInput
        style={styles.input}
        value={nome}
        placeholder="Digite um nome..."
        onChangeText={setNome}
      />

      <Button title="Buscar" onPress={buscarGitHub} />

      {erro ? <Text style={styles.error}>{erro}</Text> : null}

      {resultado && (
        <View style={styles.userBox}>
          <Text style={styles.userTitle}>{resultado.login}</Text>
          <Image
            source={{ uri: resultado.avatar_url }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  title: {
    marginTop: 25,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold"
  },
  postTitle: {
    marginVertical: 4
  },
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    marginVertical: 10
  },
  error: {
    color: "red",
    marginTop: 5
  },
  userBox: {
    marginTop: 15,
    alignItems: "center"
  },
  userTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  }
});
