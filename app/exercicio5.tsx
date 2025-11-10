// 5 - Crie um botão "Dizer Olá" que chama uma função dizerOla. Utilize useCallback para memorizar a função e observe no console que ela só é recriada quando sua dependência mudar.

import React, { useCallback, useState } from "react";
import { Button, Text, View, StyleSheet } from "react-native";

export default function Exercicio5() {
  const [nome, setNome] = useState("Renato");

  const dizerOla = useCallback(() => {
    console.log("Função dizerOla foi executada");
    alert(`Olá, ${nome}!`);
  }, [nome]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome atual: {nome}</Text>
      <View style={styles.buttonGroup}>
        <Button title="Dizer Olá" onPress={dizerOla} />
        <Button
          title="Mudar Nome"
          onPress={() => setNome((prev) => (prev === "Renato" ? "Maria" : "Renato"))}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 16,
  },
  label: {
    fontSize: 20,
  },
  buttonGroup: {
    gap: 12,
  },
});
