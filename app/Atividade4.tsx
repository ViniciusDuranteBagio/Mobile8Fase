import React, { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

export default function Atividade4() {
  const [escuro, setEscuro] = useState(false);

  const estilos = escuro ? estilosEscuro : estilosClaro;

  return (
    <View style={estilos.container}>
      <Text style={estilos.texto}>Modo {escuro ? "Escuro" : "Claro"}</Text>
      <Switch value={escuro} onValueChange={setEscuro} />
    </View>
  );
}

const estilosClaro = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  texto: {
    color: "#000000",
    fontSize: 20,
    marginBottom: 10,
  },
});

const estilosEscuro = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  texto: {
    color: "#FFFFFF",
    fontSize: 20,
    marginBottom: 10,
  },
});
