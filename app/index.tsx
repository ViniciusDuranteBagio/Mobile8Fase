import React, { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const [nome, setNome] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handlePress = () => {
    const mensagem = nome.trim()
      ? "Bem-vindo!"
      : "Digite seu nome primeiro";

    if (Platform.OS === "web") {
      alert(mensagem);
    } else {
      Alert.alert(nome.trim() ? "Sucesso" : "Atenção", mensagem);
    }
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, theme.container]}>
      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, theme.text]}>Modo Escuro</Text>
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkMode ? "#1E90FF" : "#f4f3f4"}
        />
      </View>

      <Text style={[styles.title, theme.text]}>Olá, React Native</Text>

      <Image
        source={{ uri: "https://picsum.photos/200" }}
        style={{ width: 200, height: 200, marginBottom: 20 }}
      />

      <TextInput
        style={[styles.input, theme.input]}
        placeholder="Digite seu nome"
        placeholderTextColor={isDarkMode ? "#999" : "#666"}
        value={nome}
        onChangeText={setNome}
      />

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <Text style={[styles.greeting, theme.text]}>Olá, {nome}</Text>
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
  switchContainer: {
    position: "absolute",
    top: 50,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  switchLabel: {
    fontSize: 14,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: 250,
    height: 44,
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
  },
});

const lightTheme = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
  },
  text: {
    color: "#1E90FF",
  },
  input: {
    borderColor: "#ccc",
    backgroundColor: "#fff",
    color: "#000",
  },
});

const darkTheme = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
  },
  text: {
    color: "#FFFFFF",
  },
  input: {
    borderColor: "#555",
    backgroundColor: "#222",
    color: "#fff",
  },
});