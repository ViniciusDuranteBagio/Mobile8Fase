import { Image, StyleSheet, Text, View } from "react-native";

export default function Exercicio1() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, React Native</Text>
      <Image
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    color: '#2196F3',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});
