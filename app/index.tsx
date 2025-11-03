import { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  StatusBar,
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

  const theme = isDarkMode ? darkTheme : lightTheme;

  const handlePress = () => {
    const mensagem = nome.trim() ? "Bem-vindo!" : "Digite seu nome primeiro";
    if (Platform.OS === "web") {
      alert(mensagem);
    } else {
      Alert.alert(nome.trim() ? "Sucesso" : "Atenção", mensagem);
    }
  };

  return (
    <View style={[styles.container, theme.container]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={theme.header.backgroundColor}
      />

        <View style={styles.switchRow}>
          <Text style={[styles.switchLabel, theme.text]}>
            {isDarkMode ? "Modo Escuro" : "Modo Claro"}
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDarkMode ? "#208d1cff" : "#f4f3f4"}
          />
        </View>

      <View style={styles.content}>
        <Text style={[styles.title, theme.text]}>Olá, React Native</Text>

        <Image
          source={{ uri: "https://picsum.photos/200" }}
          style={styles.image}
        />

        <TextInput
          style={[styles.input, theme.input]}
          placeholder="Digite seu nome"
          placeholderTextColor={isDarkMode ? "#aaa" : "#666"}
          value={nome}
          onChangeText={setNome}
        />

        <TouchableOpacity
          style={[styles.button, theme.button]}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <Text style={[styles.greeting, theme.text]}>
          {nome ? `Olá, ${nome}!` : ""}
        </Text>
      </View>
    </View>
  );
}

const lightTheme = StyleSheet.create({
  container: { backgroundColor: "#f9f9f9" },
  text: { color: "#1e1e1e" },
  input: {
    borderColor: "#ccc",
    backgroundColor: "#fff",
    color: "#000",
  },
  button: { backgroundColor: "#208d1cff" },
  header: {
    backgroundColor: "#e4f2e9",
  },
});

const darkTheme = StyleSheet.create({
  container: { backgroundColor: "#1e1e1e" },
  text: { color: "#f5f5f5" },
  input: {
    borderColor: "#555",
    backgroundColor: "#2c2c2c",
    color: "#fff",
  },
  button: { backgroundColor: "#3aa855" },
  header: {
    backgroundColor: "#2a2a2a",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  switchRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  switchLabel: {
    fontSize: 14,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 24,
  },
  input: {
    width: 260,
    height: 44,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 14,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 8,
    marginBottom: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  greeting: {
    fontSize: 18,
    marginTop: 8,
  },
});
