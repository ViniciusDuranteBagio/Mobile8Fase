import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button,FlatList, Image, Platform, KeyboardAvoidingView, ScrollView,
    StyleSheet, Text, TextInput, View } from "react-native";

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <View style={{ marginTop: 8 }}>{children}</View>
    </View>
);

export default function App() {
    // --- 1️⃣ Lista de usuários ---
    const [users, setUsers] = useState<any[]>([]);
    const [loadingUsers, setLoadingUsers] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("https://api.github.com/users");
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                Alert.alert("Erro", "Falha ao buscar usuários.");
            } finally {
                setLoadingUsers(false);
            }
        };
        fetchUsers();
    }, []);

    // --- 2️⃣ useCallback + botão Recarregar ---
    const [repos, setRepos] = useState<any[]>([]);
    const [loadingRepos, setLoadingRepos] = useState(false);

    const fetchRepos = useCallback(async () => {
        try {
            setLoadingRepos(true);
            const response = await fetch("https://api.github.com/orgs/expo/repos");
            const data = await response.json();
            setRepos(data);
        } catch (error) {
            Alert.alert("Erro", "Falha ao buscar repositórios.");
        } finally {
            setLoadingRepos(false);
        }
    }, []);

    useEffect(() => {
        fetchRepos();
    }, [fetchRepos]);

    // --- 3️⃣ Busca detalhada por usuário ---
    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState<any | null>(null);
    const [userRepos, setUserRepos] = useState<any[]>([]);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const searchUser = async () => {
        if (!username.trim()) {
            Alert.alert("Atenção", "Digite um nome de usuário!");
            return;
        }
        setLoadingSearch(true);
        setErrorMessage("");
        setUserData(null);
        setUserRepos([]);

        try {
            // busca dados do usuário
            const userResponse = await fetch(`https://api.github.com/users/${username}`);
            if (!userResponse.ok) throw new Error("Usuário não encontrado");
            const user = await userResponse.json();

            // busca repositórios do usuário
            const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
            const repos = await reposResponse.json();

            setUserData(user);
            setUserRepos(repos.slice(0, 5));
        } catch (error) {
            setErrorMessage("Usuário não encontrado 😢");
        } finally {
            setLoadingSearch(false);
        }
    };

    // --- Renderização ---
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={10}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Card title="1️⃣ Lista de usuários (carregada automaticamente)">
                    {loadingUsers ? (
                        <ActivityIndicator size="large" />
                    ) : (
                        <FlatList
                            data={users.slice(0, 5)}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <Text style={styles.item}>👤 {item.login}</Text>
                            )}
                            scrollEnabled={false}
                        />
                    )}
                </Card>

                <Card title="2️⃣ useCallback + botão Recarregar">
                    <Button
                        title={loadingRepos ? "Carregando..." : "🔄 Recarregar Repositórios"}
                        onPress={fetchRepos}
                        disabled={loadingRepos}
                    />
                    {loadingRepos ? (
                        <ActivityIndicator size="small" style={{ marginTop: 10 }} />
                    ) : (
                        repos.slice(0, 5).map((repo) => (
                            <Text key={repo.id} style={styles.item}>
                                📦 {repo.name}
                            </Text>
                        ))
                    )}
                </Card>

                <Card title="3️⃣ Buscar perfil do GitHub">
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o nome do usuário"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <Button title="Buscar" onPress={searchUser} />
                    {loadingSearch && <ActivityIndicator style={{ marginTop: 10 }} />}
                    {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

                    {userData && (
                        <View style={styles.profileCard}>
                            <Image source={{ uri: userData.avatar_url }} style={styles.avatar} />
                            <Text style={styles.name}>{userData.name || userData.login}</Text>
                            <Text style={styles.bio}>{userData.bio || "Sem bio disponível."}</Text>
                            <Text style={styles.stats}>
                                👥 {userData.followers} seguidores • 👣 {userData.following} seguindo
                            </Text>
                            <Text style={styles.stats}>
                                📂 {userData.public_repos} repositórios públicos
                            </Text>

                            <Text style={[styles.subtitle, { marginTop: 10 }]}>
                                Últimos repositórios:
                            </Text>
                            {userRepos.map((repo) => (
                                <Text key={repo.id} style={styles.repoItem}>
                                    • {repo.name} ({repo.language || "N/A"})
                                </Text>
                            ))}
                        </View>
                    )}
                </Card>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#0b0b15",
    },
    card: {
        backgroundColor: "#1e1e2f",
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
    },
    title: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    item: {
        color: "#ddd",
        marginTop: 8,
    },
    input: {
        backgroundColor: "#fff",
        padding: 8,
        borderRadius: 8,
        marginVertical: 10,
    },
    error: {
        color: "#ff6b6b",
        marginTop: 10,
    },
    profileCard: {
        marginTop: 15,
        alignItems: "center",
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
    bio: {
        color: "#ccc",
        fontStyle: "italic",
        textAlign: "center",
        marginVertical: 5,
    },
    stats: {
        color: "#aaa",
    },
    subtitle: {
        color: "#b6ffb6",
        fontWeight: "bold",
    },
    repoItem: {
        color: "#ddd",
        marginLeft: 10,
    },
});
