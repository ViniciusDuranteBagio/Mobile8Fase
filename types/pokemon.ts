export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  base_experience: number;
  height: number;
  weight: number;
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
}

