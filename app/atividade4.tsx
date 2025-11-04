import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Atividade4() {
  const [modoEscuro, setModoEscuro] = useState(false);

  const estilos = modoEscuro ? estilosEscuro : estilosClaro;

  return (
    <View style={[styles.container, estilos.fundo]}>
      <Text style={[styles.titulo, estilos.texto]}>
        {modoEscuro ? "🌙 Modo Escuro" : "☀️ Modo Claro"}
      </Text>

      <Switch value={modoEscuro} onValueChange={setModoEscuro} />

      <Text style={[styles.texto, estilos.texto]}>
        Altere o switch para mudar o tema!
      </Text>

      <Link href="/" style={[styles.link, estilos.texto]}>
        ← Voltar
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  texto: {
    fontSize: 18,
    marginTop: 10,
  },
  link: {
    marginTop: 30,
    fontSize: 16,
  },
});

const estilosClaro = StyleSheet.create({
  fundo: {
    backgroundColor: "#FFFFFF",
  },
  texto: {
    color: "#000000",
  },
});

const estilosEscuro = StyleSheet.create({
  fundo: {
    backgroundColor: "#000000",
  },
  texto: {
    color: "#FFFFFF",
  },
});
