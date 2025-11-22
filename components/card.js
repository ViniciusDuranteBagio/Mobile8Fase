import { Image, StyleSheet, Text, View } from "react-native";

export default function Card({ item }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textBox}>
        <Text style={styles.name}>{item.name}</Text>
        <Text>Status: {item.status}</Text>
        <Text>Espécie: {item.species}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    marginVertical: 8,
    padding: 10,
    borderRadius: 10,
    elevation: 3
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10
  },
  textBox: {
    marginLeft: 10,
    justifyContent: "center",
    flexShrink: 1
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5
  }
});
