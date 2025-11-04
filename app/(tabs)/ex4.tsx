import React, { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

export default function Exercicio4() {
  const [modoEscuro, setModoEscuro] = useState(false);

  const tema = modoEscuro ? estilosEscuro : estilosClaro;

  return (
    <View style={[styles.container, { backgroundColor: tema.background }]}>
      <Text style={[styles.titulo, { color: tema.texto }]}>
        Exercício 4: Modo Escuro
      </Text>

      <Text style={[styles.descricao, { color: tema.texto }]}>
        Use o switch abaixo para alternar entre modo claro e escuro.
      </Text>

      <View style={styles.switchContainer}>
        <Text style={{ color: tema.texto, fontSize: 16, marginRight: 8 }}>
          {modoEscuro ? "Modo Escuro" : "Modo Claro"}
        </Text>

        {/* SWITCH CONTROLADO */}
        <Switch
          value={modoEscuro}
          onValueChange={setModoEscuro}
          trackColor={{ false: "#ccc", true: "#666" }}
          thumbColor={modoEscuro ? "#fff" : "#000"}
        />
      </View>

      {/* Texto que muda com o tema */}
      <Text style={[styles.exemploTexto, { color: tema.texto }]}>
        {modoEscuro
          ? "🌙 O modo escuro está ativado!"
          : "☀️ O modo claro está ativado!"}
      </Text>
    </View>
  );
}

const estilosClaro = {
  background: "#FFFFFF",
  texto: "#000000",
};

const estilosEscuro = {
  background: "#000000",
  texto: "#FFFFFF",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  descricao: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  exemploTexto: {
    fontSize: 20,
    fontWeight: "600",
  },
});
