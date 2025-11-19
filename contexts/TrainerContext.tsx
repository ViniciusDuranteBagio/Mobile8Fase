import { createContext, useContext, useState, ReactNode } from "react";

interface TrainerContextData {
  name: string;
  avatar: string;
  clan: string | null;
  favorites: any[];
  setName: (n: string) => void;
  setAvatar: (a: string) => void;
  setClan: (c: string | null) => void;
  toggleFavorite: (pokemon: any) => void;
}

const TrainerContext = createContext<TrainerContextData>({} as TrainerContextData);

export function TrainerProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [clan, setClan] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<any[]>([]);

  function toggleFavorite(pokemon: any) {
    setFavorites((prev) => {
      const exists = prev.find((f) => f.name === pokemon.name);
      return exists ? prev.filter((f) => f.name !== pokemon.name) : [...prev, pokemon];
    });
  }

  return (
    <TrainerContext.Provider value={{ name, avatar, clan, favorites, setName, setAvatar, setClan, toggleFavorite }}>
      {children}
    </TrainerContext.Provider>
  );
}

export function useTrainer() {
  return useContext(TrainerContext);
}
