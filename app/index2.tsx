import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ValidacaoEntrada() {
  const [nome, setNome] = useState("");

  function validar() {
    if (nome.trim() === "") {
      Alert.alert("Digite seu nome primeiro");
    } else {
      Alert.alert("Bem-vindo!");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Digite seu nome:</Text>

      <TextInput
        style={styles.input}
        placeholder="Jordan"
        value={nome}
        onChangeText={setNome}
      />

      <TouchableOpacity style={styles.botao} onPress={validar}>
        <Text style={styles.botaoTexto}>Enviar</Text>
      </TouchableOpacity>
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
  botao: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 8
  },
  botaoTexto: {
    color: "white",
    fontSize: 18
  }
});
