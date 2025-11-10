import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Contador() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.warn("Valor mudou para", count);
  }, [count]);


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Valor: {count}</Text>
      <View>
        <Button title="Aumentar" onPress={() => setCount((c) => c + 1)}/>
      </View>
      <View style={styles.button}>
        <TouchableOpacity onPress={() => setCount((c) => c - 1)} >
          <Text style={styles.text}>Diminuir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    margin: 10,
    width: 100,
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
