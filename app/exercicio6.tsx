// 6 - Crie um ThemeContext e um botão que alterna entre "dark" e "light". Dois componentes diferentes devem usar o tema (por exemplo, cor do texto e cor de fundo). E serem alteradas em apenas um lugar com o useContext.

import React, { createContext, useContext, useMemo, useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";

type ThemeMode = "light" | "dark";

type Theme = {
  background: string;
  text: string;
};

const themes: Record<ThemeMode, Theme> = {
  light: {
    background: "#ffffff",
    text: "#1a1a1a",
  },
  dark: {
    background: "#1a1a1a",
    text: "#ffffff",
  },
};

const ThemeContext = createContext<{ mode: ThemeMode; theme: Theme }>({
  mode: "light",
  theme: themes.light,
});

function useTheme() {
  return useContext(ThemeContext);
}

function ThemedBox() {
  const { theme } = useTheme();
  return (
    <View style={[styles.box, { backgroundColor: theme.background }]}>
      <Text style={[styles.boxText, { color: theme.text }]}>
        Fundo muda com o tema
      </Text>
    </View>
  );
}

function ThemedText() {
  const { theme } = useTheme();
  return (
    <Text style={[styles.themedText, { color: theme.text }]}>
      Este texto também usa o tema
    </Text>
  );
}

export default function Exercicio6() {
  const [mode, setMode] = useState<ThemeMode>("light");

  const value = useMemo(
    () => ({
      mode,
      theme: themes[mode],
    }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={value}>
      <View
        style={[
          styles.container,
          { backgroundColor: value.theme.background },
        ]}
      >
        <ThemedBox />
        <ThemedText />
        <Button
          title={`Aplicar tema ${mode === "light" ? "dark" : "light"}`}
          onPress={() => setMode((prev) => (prev === "light" ? "dark" : "light"))}
        />
      </View>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 24,
  },
  box: {
    padding: 24,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  boxText: {
    fontSize: 18,
  },
  themedText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
