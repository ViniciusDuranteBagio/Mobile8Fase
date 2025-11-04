import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Atividade1() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Olá</Text>
      <Image
        source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7nhkOBLR_UJvD2ga1HhM9rrubu08x8rx8yQ&s" }}
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
    backgroundColor: "#f0f0f0",
  },
  text: {
    fontSize: 24,
    color: "#0066cc",
  },
  image: {
    width: 200,
    height: 200,
    
  },
  link: {
    color: "blue",
    fontSize: 16,
    marginTop: 10,
  },
});
