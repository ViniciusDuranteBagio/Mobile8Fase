import axios from "axios";

const API_BASE_URL = "https://pokeapi.co/api/v2";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const pokemonAPI = {
  //busca os pokemons
  getPokemons: async (offset = 0, limit = 20) => {
    try {
      const response = await api.get(
        `/pokemon?offset=${offset}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Erro ao buscar lista de pokémons");
    }
  },

  //detalhe do pokemon
  getPokemonDetails: async (urlOrId) => {
    try {
      const url = typeof urlOrId === "number" ? `/pokemon/${urlOrId}` : urlOrId;

      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao buscar detalhes do pokémon");
    }
  },

  //pesquisa o pokemon (nome dele)
  searchPokemon: async (name) => {
    try {
      const response = await api.get(`/pokemon/${name.toLowerCase()}`);
      return response.data;
    } catch (error) {
      throw new Error("Pokémon não encontrado");
    }
  },
};
