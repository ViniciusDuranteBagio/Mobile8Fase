import { useCallback, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Ticks() {
  const [ticks, setTicks] = useState(0);
  const [olas, setOlas] = useState(0);

  const dizerOla = useCallback(() => {
    console.log("Olá! (ticks:", ticks, ")");
    console.log("Olas:", olas);
  }, [ticks]);

  return (
    <View style={styles.container}>
    <Text style={styles.text}>
        Olás : {olas}
    </Text>
    <Text style={styles.text}>
        Ticks : {ticks}
    </Text>
      <Button title="Dizer Olá" onPress={() => {
        dizerOla()
        setOlas(o => o + 1);
        }} />
      <Button title="Tick" onPress={() => setTicks(t => t + 1)} />
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
});