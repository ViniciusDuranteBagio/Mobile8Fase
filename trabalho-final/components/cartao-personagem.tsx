import { StyleSheet, Text, View } from 'react-native';

import { PersonagemSwapi } from '@/types/swapi';

type CartaoPersonagemProps = {
  personagem: PersonagemSwapi;
};

export function CartaoPersonagem({ personagem }: CartaoPersonagemProps) {
  return (
    <View style={estilos.cartao}>
      <Text style={estilos.titulo}>{personagem.name}</Text>
      <Text style={estilos.subtitulo}>Gênero: {personagem.gender === 'male' ? 'masculino' : personagem.gender === 'female' ? 'feminino' : 'desconhecido'}</Text>
      <Text style={estilos.subtitulo}>Ano de nascimento: {personagem.birth_year === 'unknown' ? 'desconhecido' : personagem.birth_year}</Text>
      <Text style={estilos.detalhes}>
        Altura: {personagem.height === 'unknown' ? 'desconhecida' : personagem.height + ' cm'} • Peso: {personagem.mass === 'unknown' ? 'desconhecido' : personagem.mass + ' kg'} 
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    backgroundColor: '#0F1622',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1D2430',
  },
  titulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  subtitulo: {
    marginTop: 6,
    color: '#C3CAD9',
  },
  detalhes: {
    marginTop: 6,
    color: '#7F8EA3',
    fontSize: 13,
  },
});
