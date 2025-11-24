import { Image, StyleSheet, Text, View } from "react-native";

export default function ExemploBasico() {
  return (
    <View style={styles.container}>
      
      
      <Text style={styles.texto}>Olá, React Native</Text>

      
      <Image
        source={{ uri: "https://reactnative.dev/img/logo-og.png" }}
        style={styles.imagem}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center",     
    backgroundColor: "#fff",
  },
  texto: {
    fontSize: 24,
    color: "#4a4aef",
    marginBottom: 20,
  },
  imagem: {
    width: 200,
    height: 200,
  },
});
