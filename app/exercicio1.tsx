// 1- Crie um aplicativo com um número exibido na tela e dois botões: Aumentar e Diminuir. Cada botão deve alterar o valor corretamente utilizando useState.

import React, { useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";

export default function Exercicio1() {
  const [valor, setValor] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.valor}>{valor}</Text>
      <View style={styles.buttonRow}>
        <Button title="Diminuir" onPress={() => setValor((prev) => prev - 1)} />
        <Button title="Aumentar" onPress={() => setValor((prev) => prev + 1)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  valor: {
    fontSize: 48,
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
});
