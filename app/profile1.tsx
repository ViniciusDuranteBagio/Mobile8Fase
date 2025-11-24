import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function SaudacaoPersonalizada() {
  const [nome, setNome] = useState("");

  return (
    <View style={styles.container}>
      
      <Text style={styles.label}>Digite seu nome:</Text>

      <TextInput
        style={styles.input}
        placeholder="Jordan"
        value={nome}
        onChangeText={setNome}
      />

      {/* Exibe a mensagem dinamicamente */}
      <Text style={styles.saudacao}>
        Olá, {nome || "Jay"} 
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  label: {
    fontSize: 18,
    marginBottom: 10
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16
  },
  saudacao: {
    fontSize: 24,
    fontWeight: "bold"
  }
});
