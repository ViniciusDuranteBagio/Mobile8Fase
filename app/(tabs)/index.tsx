import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Loading from "@/components/Loading";
import PokemonCard from "@/components/PokemonCard";
import { pokemonAPI } from "@/services/api";

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  height: number;
  weight: number;
}

const Index = () => {
  //lista dos pokemons
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  //estados de carregamento
  const [loading, setLoading] = useState(true);
  //tratando erros
  const [error, setError] = useState<string | null>(null);
  //numero da pagina
  const [offset, setOffset] = useState(0);
  //String para fazer a busca no input dos pokemons
  const [searchQuery, setSearchQuery] = useState("");
  //loading para busca dos pokemons
  const [isSearching, setIsSearching] = useState(false);

  const limit = 20; //limite de pokemons por pagina

  //busca os pokemons ao entrar na tela
  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async (currentOffset = 0) => {
    try {
      setLoading(true);
      setError(null);

      const data = await pokemonAPI.getPokemons(currentOffset, limit);

      const pokemonDetails = await Promise.all(
        data.results.map((pokemon: { url: string }) =>
          pokemonAPI.getPokemonDetails(pokemon.url)
        )
      );

      setPokemons(pokemonDetails);
      setOffset(currentOffset);
    } catch (err) {
      setError("Erro ao carregar dados dos pokémons");
      console.error("Erro:", err);
    } finally {
      setLoading(false);
    }
  };

  const searchPokemon = async () => {
    if (!searchQuery.trim()) {
      fetchPokemons(0);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setIsSearching(true);
      Keyboard.dismiss();

      const pokemon = await pokemonAPI.searchPokemon(searchQuery);
      setPokemons([pokemon]);
    } catch (err) {
      setError("Pokémon não encontrado");
      setPokemons([]);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    fetchPokemons(0);
  };

  const nextPage = () => {
    if (!isSearching) {
      fetchPokemons(offset + limit);
    }
  };

  const prevPage = () => {
    if (!isSearching && offset >= limit) {
      fetchPokemons(offset - limit);
    }
  };

  const renderPokemonItem = ({ item }: { item: Pokemon }) => (
    <PokemonCard pokemon={item} />
  );

  if (loading && pokemons.length === 0) {
    return <Loading message="Carregando Pokédex..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pokédex</Text>
        <Text style={styles.subtitle}>
          {isSearching
            ? `Resultado para: ${searchQuery}`
            : `Página ${Math.floor(offset / limit) + 1}`}
        </Text>
      </View>
      {/* input para buscar os pokemons */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar Pokémon por nome..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={searchPokemon}
        />
        <TouchableOpacity style={styles.searchButton} onPress={searchPokemon}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
        {isSearching && (
          <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* trantanto erros */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() =>
              isSearching ? searchPokemon() : fetchPokemons(offset)
            }
          >
            <Text style={styles.retryButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      )}
      {!error && (
        <FlatList
          data={pokemons}
          renderItem={renderPokemonItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
      {/* botões para interação */}
      {!isSearching && !error && (
        <View style={styles.pagination}>
          <TouchableOpacity
            style={[styles.pageButton, offset === 0 && styles.disabledButton]}
            onPress={prevPage}
            disabled={offset === 0}
          >
            <Text style={styles.pageButtonText}>Página Anterior</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.pageButton} onPress={nextPage}>
            <Text style={styles.pageButtonText}>Próxima Página</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    paddingVertical: 5,
    backgroundColor: "#FF0000",
    paddingTop: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 12,
    color: "white",
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  searchButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  clearButton: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  clearButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  listContent: {
    paddingBottom: 16,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  pageButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 8,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  pageButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#FF3B30",
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Index;
