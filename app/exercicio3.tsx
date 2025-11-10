// 3 - Crie um contador com useState. Utilize useEffect para exibir um console.log() toda vez que o valor do contador mudar. Utilizando UseEffect.
import React, { useEffect, useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";

export default function Exercicio3() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    console.log(`O contador mudou para: ${contador}`);
  }, [contador]);

  return (
    <View style={styles.container}>
      <Text style={styles.valor}>{contador}</Text>
      <View style={styles.buttonRow}>
        <Button title="-" onPress={() => setContador((prev) => prev - 1)} />
        <Button title="+" onPress={() => setContador((prev) => prev + 1)} />
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
