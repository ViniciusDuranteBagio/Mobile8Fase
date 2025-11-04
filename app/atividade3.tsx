import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Atividade3() {
  const [nome, setNome] = useState("");

  const validar = () => {
    if (nome.trim() === "") {
      Alert.alert("Digite seu nome primeiro");
    } else {
      Alert.alert(`Bem-vindo, ${nome}!`);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />
     
     
      <TouchableOpacity style={styles.button} onPress={validar}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  link: {
    color: "blue",
    fontSize: 16,
    marginTop: 20,
  },
});