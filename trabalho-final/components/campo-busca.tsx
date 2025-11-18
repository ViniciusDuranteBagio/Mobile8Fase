import { StyleSheet, TextInput } from 'react-native';

type CampoBuscaProps = {
  valor: string;
  aoAlterar: (texto: string) => void;
  placeholder?: string;
};

export function CampoBusca({ valor, aoAlterar, placeholder }: CampoBuscaProps) {
  return (
    <TextInput
      placeholder={placeholder ?? 'Buscar personagem por nome'}
      placeholderTextColor="#9AA0AB"
      style={estilos.campo}
      value={valor}
      onChangeText={aoAlterar}
      autoCorrect={false}
    />
  );
}

const estilos = StyleSheet.create({
  campo: {
    width: '100%',
    height: 75,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#272B33',
    paddingHorizontal: 14,
    color: '#FFFFFF',
    backgroundColor: '#0B111A',
  },
});
