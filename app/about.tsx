import { StyleSheet, Text, View } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre o Aplicativo</Text>
      <Text style={styles.text}>
        Este é um app criado para estudos de navegação, componentes e React Native.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10
  },
  text: {
    fontSize: 16
  }
});
