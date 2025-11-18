import { useState } from "react";
import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";

export default function PokemonCard({ name, url }) {
  const id = url.split("/")[6];
  const [isHover, setHover] = useState(false);

  return (
    <Pressable
      style={[styles.card, isHover && styles.cardHover]}
      onHoverIn={() => setHover(true)}
      onHoverOut={() => setHover(false)}
    >
      <View style={styles.innerBorder}>
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            }}
            style={styles.img}
          />
        </View>

        <Text style={styles.name}>{name}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "30%",
    borderRadius: 14,
    marginBottom: 15,
    alignItems: "center",
    backgroundColor: "#fefefe",

    // Sombra
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
      web: {
        transition: "0.2s",
        boxShadow: "0 6px 15px rgba(0,0,0,0.18)",
      },
    }),
  },
  cardHover: {
    transform: Platform.OS === "web" ? "scale(1.05)" : undefined,
    boxShadow: Platform.OS === "web" ? "0 4px 12px rgba(0,0,0,0.18)" : undefined,
  },
  innerBorder: {
    width: "100%",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#006eff75",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#fff",
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
