import { Text, View, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View>
      <Link rel="stylesheet" href="/atividade1">
      <Text>Atividade 01</Text>
      </Link>
      <Link rel="stylesheet" href="/atividade2">
      <Text>Atividade 02</Text>
      </Link>
      <Link rel="stylesheet" href="/atividade3">
      <Text>Atividade 03</Text>
      </Link><Link rel="stylesheet" href="/atividade4">
      <Text>Atividade 04</Text>
      </Link>
    </View>
  );
}
