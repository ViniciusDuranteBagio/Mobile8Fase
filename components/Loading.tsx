import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = "Carregando..." }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FF0000" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default Loading;
