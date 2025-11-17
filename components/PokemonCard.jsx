import { View, Text, Image, StyleSheet, Pressable, Platform } from "react-native";
import { useState } from "react";

export default function PokemonCard({ name, url }) {
  const id = url.split("/")[6];
  const [isHover, setHover] = useState(false);

  return (
    <Pressable
      style={[styles.card, isHover && styles.cardHover]}
      onHoverIn={() => setHover(true)}
      onHoverOut={() => setHover(false)}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          }}
          style={styles.img}
        />
      </View>

      <Text style={styles.name}>{name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "30%",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    paddingVertical: 12,
    marginBottom: 15,
    alignItems: "center",

    // Sombra
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
      web: {
        transition: "0.2s",
        boxShadow: "0 2px 5px rgba(0,0,0,0.12)",
      },
    }),
  },
  cardHover: {
    transform: Platform.OS === "web" ? "scale(1.05)" : undefined,
    boxShadow: Platform.OS === "web" ? "0 4px 12px rgba(0,0,0,0.18)" : undefined,
  },
  imageWrapper: {
    backgroundColor: "#F2F7FF",
    width: 90,
    height: 90,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  img: {
    width: 70,
    height: 70,
  },
  name: {
    fontSize: 15,
    textTransform: "capitalize",
    fontWeight: "600",
    color: "#333",
  },
});
