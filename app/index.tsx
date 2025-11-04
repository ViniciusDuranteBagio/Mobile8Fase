import Exercicio1 from "@/components/Exercicio1";
import Exercicio2 from "@/components/Exercicio2";
import Exercicio3 from "@/components/Exercicio3";
import Exercicio4 from "@/components/Exercicio4";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [exercicioAtivo, setExercicioAtivo] = useState<number | null>(null);

  // Se um exercício está ativo, mostra o componente
  if (exercicioAtivo !== null) {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => setExercicioAtivo(null)}
        >
          <Text style={styles.backButtonText}>← Voltar ao Menu</Text>
        </TouchableOpacity>
        
        {exercicioAtivo === 1 && <Exercicio1 />}
        {exercicioAtivo === 2 && <Exercicio2 />}
        {exercicioAtivo === 3 && <Exercicio3 />}
        {exercicioAtivo === 4 && <Exercicio4 />}
      </View>
    );
  }

  // Menu principal
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Componentes Essenciais do React Native</Text>
        <Text style={styles.subtitle}>Escolha um exercício:</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setExercicioAtivo(1)}
        >
          <Text style={styles.buttonText}>Exercício 1: Primeira Tela</Text>
          <Text style={styles.buttonDescription}>Text, Image e View</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setExercicioAtivo(2)}
        >
          <Text style={styles.buttonText}>Exercício 2: Saudação Personalizada</Text>
          <Text style={styles.buttonDescription}>TextInput e useState</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setExercicioAtivo(3)}
        >
          <Text style={styles.buttonText}>Exercício 3: Validação de Entrada</Text>
          <Text style={styles.buttonDescription}>TouchableOpacity e Alert</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setExercicioAtivo(4)}
        >
          <Text style={styles.buttonText}>Exercício 4: Modo Escuro</Text>
          <Text style={styles.buttonDescription}>Switch e Tema Dinâmico</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 30,
  },
  button: {
    width: "100%",
    maxWidth: 350,
    backgroundColor: "#2196F3",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttonDescription: {
    color: "#E3F2FD",
    fontSize: 14,
  },
  backButton: {
    backgroundColor: "#555",
    padding: 15,
    alignItems: "center",
    marginTop: 40,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
