import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Exercicio2() {
  const [nome, setNome] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Digite seu nome:</Text>
      <TextInput
        style={styles.input}
        placeholder="Seu nome aqui..."
        placeholderTextColor="#999"
        value={nome}
        onChangeText={setNome}
      />
      <Text style={styles.greeting}>
        {nome ? `Olá, ${nome}` : "Olá, "}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    width: '100%',
    maxWidth: 300,
    height: 50,
    borderWidth: 2,
    borderColor: '#2196F3',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 10,
  },
});