import { Image, StyleSheet, Text, View } from "react-native";

export default function Atividade1() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Olá, React Native!</Text>
      <Image
        source={{ uri: "https://pbs.twimg.com/media/Fpvj3exWcAU6XuL.jpg" }}
        style={styles.imagem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  texto: {
    fontSize: 24,
    color: "#007AFF",
    marginBottom: 20,
  },
  imagem: {
    width: 200,
    height: 200,
  },
});
