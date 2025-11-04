import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Exercicio2() {
  const [nome, setNome] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Digite seu nome:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Maria"
        value={nome}
        onChangeText={setNome}
      />
      {nome ? (
        <Text style={styles.greeting}>Olá, {nome}!</Text>
      ) : (
        <Text style={styles.placeholder}>Digite seu nome acima 👆</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: { fontSize: 20, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "80%",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  greeting: {
    fontSize: 22,
    color: "#007BFF",
    marginTop: 20,
    fontWeight: "bold",
  },
  placeholder: {
    fontSize: 18,
    color: "#888",
    marginTop: 20,
    fontStyle: "italic",
  },
});
