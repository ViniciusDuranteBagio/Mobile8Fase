import { Text, View, Image, TouchableOpacity} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";

export default function Index() {
  const [numero, setNumero] = useState(0);

  const aumentar = () => {
    setNumero(numero + 1);
  };

  const diminuir = () => {
    setNumero(numero - 1);
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
        style={{ fontSize: 20, 
                 fontWeight: "bold", 
                 textAlign: "center", 
                 marginBottom: 20,
                 color: "black" }}
        >1- Crie um aplicativo com um número exibido na tela e dois botões: Aumentar e Diminuir. Cada botão deve alterar o valor corretamente utilizando useState.</Text>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 30 }}>
        Número: {numero}
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
