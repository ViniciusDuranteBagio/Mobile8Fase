import { useState } from "react";
import { Alert, Image, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Exercicio4() {
  const [nome, setNome] = useState("");
  const [modoEscuro, setModoEscuro] = useState(false);

  const handlePress = () => {
    if (nome.trim()) {
      Alert.alert("Bem-vindo!", `Seja bem-vindo(a), ${nome}!`);
    } else {
      Alert.alert("Atenção", "Digite seu nome primeiro");
    }
  };

  // Estilos dinâmicos baseados no tema
  const temaAtual = modoEscuro ? estilosEscuros : estilosClaros;

  return (
    <View style={[styles.container, temaAtual.container]}>
      {/* Controle do Switch */}
      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, temaAtual.text]}>
          {modoEscuro ? "🌙 Modo Escuro" : "☀️ Modo Claro"}
        </Text>
        <Switch
          value={modoEscuro}
          onValueChange={setModoEscuro}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={modoEscuro ? "#2196F3" : "#f4f3f4"}
        />
      </View>

      {/* Título */}
      <Text style={[styles.title, temaAtual.text]}>Olá, React Native</Text>

      {/* Imagem */}
      <Image
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        style={styles.image}
      />

      {/* Label e Input */}
      <Text style={[styles.label, temaAtual.text]}>Digite seu nome:</Text>
      <TextInput
        style={[styles.input, temaAtual.input]}
        placeholder="Seu nome aqui..."
        placeholderTextColor={modoEscuro ? "#aaa" : "#999"}
        value={nome}
        onChangeText={setNome}
      />

      {/* Saudação */}
      <Text style={[styles.greeting, temaAtual.text]}>
        {nome ? `Olá, ${nome}` : "Olá, "}
      </Text>

      {/* Botão */}
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  switchContainer: {
    position: 'absolute',
    top: 60,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    maxWidth: 300,
    height: 50,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

// Estilos para o modo claro
const estilosClaros = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },
  text: {
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#2196F3',
    color: '#333',
  },
});

// Estilos para o modo escuro
const estilosEscuros = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
  },
  text: {
    color: '#FFFFFF',
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderColor: '#2196F3',
    color: '#FFFFFF',
  },
});