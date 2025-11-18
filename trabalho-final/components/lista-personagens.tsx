import { FlatList, StyleSheet, Text } from 'react-native';

import { PersonagemSwapi } from '@/types/swapi';

import { CartaoPersonagem } from './cartao-personagem';

type ListaPersonagensProps = {
  personagens: PersonagemSwapi[];
};

export function ListaPersonagens({ personagens }: ListaPersonagensProps) {
  return (
    <FlatList
      data={personagens}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => <CartaoPersonagem personagem={item} />}
      contentContainerStyle={[
        estilos.conteudo,
        personagens.length === 0 && estilos.listaVazia,
      ]}
      ListEmptyComponent={<Text style={estilos.textoAjuda}>Nenhum personagem encontrado.</Text>}
      showsVerticalScrollIndicator={false}
    />
  );
}

const estilos = StyleSheet.create({
  conteudo: {
    gap: 12,
    paddingBottom: 8,
  },
  listaVazia: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoAjuda: {
    color: '#9AA0AB',
  },
});
