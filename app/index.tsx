import { Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View>
      <Link href="/exercicio1">
        <Text>Exercicio 1</Text>
      </Link>
      <Link href="/exercicio2">
        <Text>Exercicio 2</Text>
      </Link>
      <Link href="/exercicio3">
        <Text>Exercicio 3</Text>
      </Link>
      <Link href="/exercicio4">
        <Text>Exercicio 4</Text>
      </Link>
       <Link href="/exercicio5">
        <Text>Exercicio 5</Text>
      </Link>
       <Link href="/exercicio6">
        <Text>Exercicio 6</Text>
      </Link>
    </View>
  );
}
