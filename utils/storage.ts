import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pokemon } from '../types/pokemon';

const POKEDEX_KEY = '@gotchamon:pokedex';
const CAPTURED_KEY = '@gotchamon:captured';

export async function getPokedex(): Promise<Pokemon[]> {
  try {
    const data = await AsyncStorage.getItem(POKEDEX_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao carregar Pokédex:', error);
    return [];
  }
}

export async function addToPokedex(pokemon: Pokemon): Promise<void> {
  try {
    const pokedex = await getPokedex();
    const exists = pokedex.some(p => p.id === pokemon.id);
    if (!exists) {
      pokedex.push(pokemon);
      await AsyncStorage.setItem(POKEDEX_KEY, JSON.stringify(pokedex));
    }
  } catch (error) {
    console.error('Erro ao adicionar à Pokédex:', error);
  }
}

export async function getCaptured(): Promise<Pokemon[]> {
  try {
    const data = await AsyncStorage.getItem(CAPTURED_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao carregar pokémons capturados:', error);
    return [];
  }
}

export async function addCaptured(pokemon: Pokemon): Promise<void> {
  try {
    const captured = await getCaptured();
    captured.push(pokemon);
    await AsyncStorage.setItem(CAPTURED_KEY, JSON.stringify(captured));
  } catch (error) {
    console.error('Erro ao adicionar pokémon capturado:', error);
  }
}

export async function removeCaptured(index: number): Promise<void> {
  try {
    const captured = await getCaptured();
    captured.splice(index, 1);
    await AsyncStorage.setItem(CAPTURED_KEY, JSON.stringify(captured));
  } catch (error) {
    console.error('Erro ao remover pokémon capturado:', error);
  }
}

