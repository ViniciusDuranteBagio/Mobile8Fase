import { Pokemon } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export async function fetchPokemon(idOrName: string | number): Promise<Pokemon> {
  try {
    const response = await fetch(`${BASE_URL}/${idOrName}/`);
    if (!response.ok) {
      throw new Error('Erro ao buscar pokémon');
    }
    const data = await response.json();
    return data as Pokemon;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}

export function getRandomPokemonId(): number {
  // Gera um ID aleatório entre 1 e 1010 (primeira geração até aproximadamente a 7ª)
  return Math.floor(Math.random() * 1010) + 1;
}

