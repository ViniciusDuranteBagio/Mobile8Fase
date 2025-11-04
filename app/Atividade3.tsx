import React, { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";

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
      <Button title="Enviar" onPress={validar} />
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
});
