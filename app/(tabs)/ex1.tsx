import { Image, StyleSheet, Text, View } from "react-native";

export default function Exercicio1() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Olá, React Native!</Text>
      <Image
        source={{ uri: "https://picsum.photos/200" }}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 24,
    color: "#007BFF",
    marginBottom: 20,
    fontWeight: "bold",
  },
  image: { width: 200, height: 200, borderRadius: 10 },
});
