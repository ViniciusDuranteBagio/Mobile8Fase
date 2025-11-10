import React from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link } from "expo-router";

const exercicios = [
  { titulo: "Exercício 1", href: "/exercicio1", descricao: "Contador simples" },
  { titulo: "Exercício 2", href: "/exercicio2", descricao: "Mostrar/Esconder texto" },
  {
    titulo: "Exercício 3",
    href: "/exercicio3",
    descricao: "Contador com useEffect",
  },
  {
    titulo: "Exercício 4",
    href: "/exercicio4",
    descricao: "Alerta inicial com useEffect",
  },
  {
    titulo: "Exercício 5",
    href: "/exercicio5",
    descricao: "useCallback com botão de saudação",
  },
  {
    titulo: "Exercício 6",
    href: "/exercicio6",
    descricao: "Tema global com useContext",
  },
];

export default function Index() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Exercícios da disciplina</Text>
        <Text style={styles.subtitle}>
          Escolha um exercício para abrir o exemplo correspondente.
        </Text>
        <FlatList
          data={exercicios}
          keyExtractor={(item) => item.href}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Link href={item.href} asChild>
              <Pressable style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
                <Text style={styles.cardTitle}>{item.titulo}</Text>
                <Text style={styles.cardDescription}>{item.descricao}</Text>
              </Pressable>
            </Link>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f4f4f5",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
  },
  list: {
    paddingVertical: 12,
    gap: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  cardDescription: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
});
