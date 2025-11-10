// 2- Crie um botão que alterna entre mostrar e esconder um texto na tela. Se o texto estiver escondido, o botão deve mostrar "Mostrar". Se estiver visível, "Esconder". Utilizando UseState.

import React, { useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";

export default function Exercicio2() {
  const [visivel, setVisivel] = useState(false);

  return (
    <View style={styles.container}>
      {visivel && <Text style={styles.mensagem}>Texto visível!</Text>}
      <Button
        title={visivel ? "Esconder" : "Mostrar"}
        onPress={() => setVisivel((prev) => !prev)}
      />
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
  mensagem: {
    fontSize: 24,
  },
});
