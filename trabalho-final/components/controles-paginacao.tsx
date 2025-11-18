import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ControlesPaginacaoProps = {
  temPaginaAnterior: boolean;
  temProximaPagina: boolean;
  desabilitado: boolean;
  aoPressionarAnterior: () => void;
  aoPressionarProxima: () => void;
};

export function ControlesPaginacao({
  temPaginaAnterior,
  temProximaPagina,
  desabilitado,
  aoPressionarAnterior,
  aoPressionarProxima,
}: ControlesPaginacaoProps) {
  const bloquearAnterior = desabilitado || !temPaginaAnterior;
  const bloquearProxima = desabilitado || !temProximaPagina;

  return (
    <View style={estilos.container}>
      <TouchableOpacity
        onPress={aoPressionarAnterior}
        disabled={bloquearAnterior}
        style={[estilos.botao, bloquearAnterior && estilos.botaoDesabilitado]}>
        <Text style={estilos.textoBotao}>Página Anterior</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={aoPressionarProxima}
        disabled={bloquearProxima}
        style={[estilos.botao, bloquearProxima && estilos.botaoDesabilitado]}>
        <Text style={estilos.textoBotao}>Próxima Página</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  botao: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE81F',
  },
  botaoDesabilitado: {
    opacity: 0.4,
  },
  textoBotao: {
    fontWeight: '700',
    color: '#05090F',
  },
});
