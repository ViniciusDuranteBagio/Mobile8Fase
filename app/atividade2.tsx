import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Atividade2() {
  const [nome, setNome] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />
      <Text style={styles.text}>
        {nome ? `Olá, ${nome}!` : "Digite seu nome acima"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    width: 200,
    marginBottom: 20,
    borderRadius: 8,
  },
  text: {
    fontSize: 20,
  },
  link: {
    color: "blue",
    fontSize: 16,
    marginTop: 20,
  },
});