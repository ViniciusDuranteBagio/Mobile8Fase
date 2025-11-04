import { useState } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Exercicio3() {
  const [nome, setNome] = useState("");

  const handlePress = () => {
    if (nome.trim() !== "") {
      if (Platform.OS === "web") {
        window.alert(`Bem-vindo, ${nome}!`);
      } else {
        Alert.alert("Bem-vindo!", `Olá, ${nome}!`);
      }
    } else {
      if (Platform.OS === "web") {
        window.alert("Digite seu nome primeiro");
      } else {
        Alert.alert("Atenção", "Digite seu nome primeiro");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Digite seu nome:</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Maria"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.preview}>
        {nome ? `Olá, ${nome}` : "Digite seu nome acima 👆"}
      </Text>

      {/* Botão principal */}
      <TouchableOpacity
        style={styles.button}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "80%",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  preview: {
    fontSize: 18,
    color: "#555",
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
