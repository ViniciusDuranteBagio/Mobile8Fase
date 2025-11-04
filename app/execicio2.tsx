import { TextInput, View, Text, Button } from "react-native";
import { router } from "expo-router";
import { useState } from "react";

export default function Exercicio2() {
    const [nome, setNome] = useState("")
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#FAF0E6",
        gap: 32
      }}
    >
      <TextInput style={{
        fontSize: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#272757",
        width: "100%",
        margin: 32,
        color: "#272757"
        }} onChangeText={setNome} />
      <Text style={{
        fontSize: 20,
        color: "#272757"
      }}>
        Olá, {nome}
      </Text>
      <Button onPress={() => router.navigate("/exercicio3")} title="Avançar"/>
        <Button onPress={() => router.back} title="Voltar"/>
    </View>
  );
}