import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const [nome, setNome] = useState("");

  const handlePress = () => {
    if (nome.trim()) {
      Alert.alert("Sucesso", "Bem-vindo!");
    } else {
      Alert.alert("Atenção", "Digite seu nome primeiro");
    }
  };

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

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

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
  button: {
    backgroundColor: "#1E90FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  greeting: {
    fontSize: 18,
    color: "#333",
  },
});
