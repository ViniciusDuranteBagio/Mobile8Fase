import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

export default function ModoEscuro() {
  const [darkMode, setDarkMode] = useState(false);

  
  const estiloClaro = {
    backgroundColor: "#FFFFFF",
    textColor: "#000000"
  };

  const estiloEscuro = {
    backgroundColor: "#000000",
    textColor: "#FFFFFF"
  };

  const tema = darkMode ? estiloEscuro : estiloClaro;

  return (
    <View style={[styles.container, { backgroundColor: tema.backgroundColor }]}>
      
      <Text style={[styles.texto, { color: tema.textColor }]}>
        Modo: {darkMode ? "Escuro" : "Claro"}
      </Text>

      <Switch
        value={darkMode}
        onValueChange={setDarkMode}
        thumbColor={darkMode ? "#fff" : "#000"}
      />

      <Text style={[styles.texto, { color: tema.textColor, marginTop: 20 }]}>
        O tema muda instantaneamente!
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  texto: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  }
});
