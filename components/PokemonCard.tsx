import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface PokemonType {
  type: {
    name: string;
  };
}

interface Pokemon {
  id: number;

  name: string;

  sprites: {
    front_default: string;
  };

  types: PokemonType[];
  height: number;
  weight: number;
}

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const getTypeColor = (type: string) => {
    //cor de acordo com o tipo do pokemon
    const colors: { [key: string]: string } = {
      normal: "#A8A878",
      fire: "#F08030",
      water: "#6890F0",
      electric: "#F8D030",
      grass: "#78C850",
      ice: "#98D8D8",
      fighting: "#C03028",
      poison: "#A040A0",
      ground: "#E0C068",
      flying: "#A890F0",
      psychic: "#F85888",
      bug: "#A8B820",
      rock: "#B8A038",
      ghost: "#705898",
      dragon: "#7038F8",
      dark: "#705848",
      steel: "#B8B8D0",
      fairy: "#EE99AC",
    };
    return colors[type] || "#777";
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>
          {pokemon.id} -{" "}
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </Text>
      </View>

      <Image
        source={{ uri: pokemon.sprites.front_default }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.stats}>
        <Text style={styles.statText}>Altura: {pokemon.height / 10}m</Text>
        <Text style={styles.statText}>Peso: {pokemon.weight / 10}kg</Text>
      </View>

      {/* https://pokeapi.co/api/v2/type/ */}
      {/* "count": 21,
    "next": "https://pokeapi.co/api/v2/type/?offset=20&limit=1",
    "previous": null,
    "results": [
        {
            "name": "normal",
            "url": "https://pokeapi.co/api/v2/type/1/"
        },
        {
            "name": "fighting",
            "url": "https://pokeapi.co/api/v2/type/2/"
        },
        {
            "name": "flying",
            "url": "https://pokeapi.co/api/v2/type/3/"
        },
        {
            "name": "poison",
            "url": "https://pokeapi.co/api/v2/type/4/"
        },
        {
            "name": "ground",
            "url": "https://pokeapi.co/api/v2/type/5/"
        },
        {
            "name": "rock",
            "url": "https://pokeapi.co/api/v2/type/6/"
        },
        {
            "name": "bug",
            "url": "https://pokeapi.co/api/v2/type/7/"
        },
        {
            "name": "ghost",
            "url": "https://pokeapi.co/api/v2/type/8/"
        },
        {
            "name": "steel",
            "url": "https://pokeapi.co/api/v2/type/9/"
        },
        {
            "name": "fire",
            "url": "https://pokeapi.co/api/v2/type/10/"
        },
        {
            "name": "water",
            "url": "https://pokeapi.co/api/v2/type/11/"
        },
        {
            "name": "grass",
            "url": "https://pokeapi.co/api/v2/type/12/"
        },
        {
            "name": "electric",
            "url": "https://pokeapi.co/api/v2/type/13/"
        },
        {
            "name": "psychic",
            "url": "https://pokeapi.co/api/v2/type/14/"
        },
        {
            "name": "ice",
            "url": "https://pokeapi.co/api/v2/type/15/"
        },
        {
            "name": "dragon",
            "url": "https://pokeapi.co/api/v2/type/16/"
        },
        {
            "name": "dark",
            "url": "https://pokeapi.co/api/v2/type/17/"
        },
        {
            "name": "fairy",
            "url": "https://pokeapi.co/api/v2/type/18/"
        },
        {
            "name": "stellar",
            "url": "https://pokeapi.co/api/v2/type/19/"
        },
        {
            "name": "unknown",
            "url": "https://pokeapi.co/api/v2/type/10001/"
        }
    ]
} */}
      {/* dentro de um pokemon exemplo charmander: */}
      {/* "types": [
        {
            "slot": 1,
            "type": {
                "name": "fire",
                "url": "https://pokeapi.co/api/v2/type/10/"
            }
        }
    ], */}

      <View style={styles.typesContainer}>
        {pokemon.types.map((typeInfo, index) => (
          <View
            key={index}
            style={[
              styles.typeBadge,
              { backgroundColor: getTypeColor(typeInfo.type.name) },
            ]}
          >
            <Text style={styles.typeText}>
              {typeInfo.type.name.toUpperCase()}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 16,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  header: {
    alignItems: "center",
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: "center",
  },
  typesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 8,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  typeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
  statText: {
    fontSize: 12,
    color: "#666",
  },
});

export default PokemonCard;
