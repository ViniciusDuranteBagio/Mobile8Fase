import { Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

export default function Atividade3() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    console.log("Valor do contador mudou para:", contador);
  }, [contador]);

  const aumentar = () => {
    setContador(contador + 1);
  };

  const diminuir = () => {
    setContador(contador - 1);
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
        3- Crie um contador com useState. Utilize useEffect para exibir um
        console.log() toda vez que o valor do contador mudar. Utilizando
        UseEffect.
      </Text>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 30 }}>
        Contador: {contador}
      </Text>
      <View style={{ flexDirection: "row", gap: 20 }}>
        <TouchableOpacity
          onPress={aumentar}
          style={{
            backgroundColor: "#4CAF50",
            paddingHorizontal: 30,
            paddingVertical: 15,
            borderRadius: 8,
            marginRight: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            Aumentar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={diminuir}
          style={{
            backgroundColor: "#f44336",
            paddingHorizontal: 30,
            paddingVertical: 15,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            Diminuir
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

