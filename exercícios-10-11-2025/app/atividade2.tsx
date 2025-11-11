import { Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";

export default function Atividade2() {
  const [mostrarTexto, setMostrarTexto] = useState(false);

  const alternarTexto = () => {
    setMostrarTexto(!mostrarTexto);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
          color: "black",
        }}
      >
        2- Crie um botão que alterna entre mostrar e esconder um texto na tela.
        Se o texto estiver escondido, o botão deve mostrar "Mostrar". Se
        estiver visível, "Esconder". Utilizando UseState.
      </Text>
      {mostrarTexto && (
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 30,
            color: "red",
          }}
        >
          Texto aparecendo
        </Text>
      )}
      <TouchableOpacity
        onPress={alternarTexto}
        style={{
          backgroundColor: "#2196F3",
          paddingHorizontal: 30,
          paddingVertical: 15,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
          {mostrarTexto ? "Esconder" : "Mostrar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

