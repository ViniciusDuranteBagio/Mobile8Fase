import { Text, View, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function Index() {
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
          fontSize: 24,
          color: "red",
        }}
      >
        Olá, React Native!
      </Text>

      <Image
        source={{
          uri: "https://pbs.twimg.com/media/BfBBn5hCEAAvrbm.jpg:large",
        }}
        style={{
          width: 200,
          height: 200,
        }}
      />
    </View>
  );
}
