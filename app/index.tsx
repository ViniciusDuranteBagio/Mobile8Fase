import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atividades React Native</Text>

      <Link href="/atividade1" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Atividade 1</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/atividade2" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Atividade 2</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/atividade3" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Atividade 3</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/atividade4" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Atividade 4</Text>
        </TouchableOpacity>
      </Link>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: 200,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
});
