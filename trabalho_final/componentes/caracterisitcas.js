import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function CharacterCard({ character }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{character.name}</Text>
        <Text style={styles.meta}>Espécie: {character.species}</Text>
        <Text style={styles.meta}>Status: {character.status}</Text>
        <Text style={styles.meta}>Local: {character.location?.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 10 },
  info: { flex: 1, justifyContent: "center" },
  name: { fontWeight: "700", fontSize: 16, marginBottom: 4 },
  meta: { fontSize: 12, color: "#555" },
});
