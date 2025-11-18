export type PersonagemSwapi = {
  name: string;
  gender: string;
  birth_year: string;
  height: string;
  mass: string;
};

export type RespostaSwapi = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PersonagemSwapi[];
};
