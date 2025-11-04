import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Switch,
  Alert,
  StyleSheet,
} from "react-native";

export default function Exercicios234() {
  const [nome, setNome] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const validarNome = () => {
    if (nome.trim() === "") {
      Alert.alert("Digite seu nome primeiro");
    } else {
      Alert.alert("Bem-vindo!");
    }
  };

  const tema = darkMode ? darkStyles : lightStyles;

  return (
    <View style={[styles.container, tema.container]}>
      {/* Exercício 2 */}
      <TextInput
        placeholder="Digite seu nome"
        placeholderTextColor={darkMode ? "#aaa" : "#555"}
        style={[styles.input, tema.input]}
        onChangeText={setNome}
      />

      <Text style={[styles.text, tema.text]}>
        Olá, {nome || "..."}
      </Text>

      {/* Exercício 3 */}
      <View style={{ marginTop: 12, width: "60%" }}>
        <Button title="Confirmar" onPress={validarNome} />
      </View>

      {/* Exercício 4 */}
      <View style={styles.switchContainer}>
        <Text style={[styles.text, tema.text]}>Modo escuro</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 20,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    width: "70%",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
  },
});

// Tema claro
const lightStyles = {
  container: { backgroundColor: "#FFFFFF" },
  text: { color: "#000000" },
  input: { borderColor: "#000000", color: "#000000" },
};

// Tema escuro
const darkStyles = {
  container: { backgroundColor: "#000000" },
  text: { color: "#FFFFFF" },
  input: { borderColor: "#FFFFFF", color: "#FFFFFF" },
};
