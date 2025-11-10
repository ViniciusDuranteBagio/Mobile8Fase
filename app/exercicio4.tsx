// 4- Ao abrir a tela, exiba um alert("Bem-vindo!") apenas uma vez usando useEffect com array de dependências vazio [].
import React, { useEffect } from "react";
import { Alert, Text, View, StyleSheet } from "react-native";

export default function Exercicio4() {
  useEffect(() => {
    Alert.alert("Bem-vindo!");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.mensagem}>Abra o console para ver o alerta.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  mensagem: {
    fontSize: 18,
    textAlign: "center",
  },
});
