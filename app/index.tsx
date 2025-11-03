import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  const [nome, setNome] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, React Native</Text>

      <Image
        source={{ uri: "https://picsum.photos/200" }}
        style={{ width: 200, height: 200, marginBottom: 20 }}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.greeting}>Olá, {nome}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: "#1E90FF",
    marginBottom: 20,
  },
  input: {
    width: 250,
    height: 44,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  greeting: {
    fontSize: 18,
    color: "#333",
  },
});
