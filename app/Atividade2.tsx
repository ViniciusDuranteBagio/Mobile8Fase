import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

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
      <Text style={styles.texto}>
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
    borderColor: "#aaa",
    borderRadius: 5,
    padding: 10,
    width: "80%",
    marginBottom: 20,
  },
  texto: {
    fontSize: 20,
  },
});
