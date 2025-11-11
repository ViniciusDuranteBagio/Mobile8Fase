import { Text, View, TouchableOpacity } from "react-native";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Definindo o tipo do tema
type Theme = "light" | "dark";

// Definindo o tipo do contexto
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: {
    background: string;
    text: string;
  };
}

// Criando o ThemeContext
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Hook personalizado para usar o contexto
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve ser usado dentro de ThemeProvider");
  }
  return context;
};

// Provider do tema
const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const colors = {
    background: theme === "light" ? "#FFFFFF" : "#121212",
    text: theme === "light" ? "#000000" : "#FFFFFF",
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Componente 1: Usa a cor de fundo do tema
const ComponenteFundo = () => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.background,
        padding: 20,
        borderRadius: 8,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: colors.text,
      }}
    >
      <Text style={{ color: colors.text, fontSize: 16, textAlign: "center" }}>
        Componente 1: Usa a cor de fundo do tema
      </Text>
    </View>
  );
};

// Componente 2: Usa a cor de texto do tema
const ComponenteTexto = () => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        padding: 20,
        borderRadius: 8,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: colors.text,
      }}
    >
      <Text style={{ color: colors.text, fontSize: 16, textAlign: "center" }}>
        Componente 2: Usa a cor de texto do tema
      </Text>
    </View>
  );
};

// Componente interno que usa o contexto
const ConteudoAtividade = () => {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: colors.background,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
          color: colors.text,
        }}
      >
        6- Crie um ThemeContext e um botão que alterna entre "dark" e "light".
        Dois componentes diferentes devem usar o tema (por exemplo, cor do
        texto e cor de fundo). E serem alteradas em apenas um lugar com o
        useContext.
      </Text>

      <Text
        style={{
          fontSize: 18,
          marginBottom: 30,
          color: colors.text,
          fontWeight: "bold",
        }}
      >
        Tema atual: {theme === "light" ? "Claro" : "Escuro"}
      </Text>

      <ComponenteFundo />
      <ComponenteTexto />

      <TouchableOpacity
        onPress={toggleTheme}
        style={{
          backgroundColor: theme === "light" ? "#2196F3" : "#FF9800",
          paddingHorizontal: 40,
          paddingVertical: 15,
          borderRadius: 8,
          marginTop: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
          Alternar Tema ({theme === "light" ? "Dark" : "Light"})
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Componente principal que envolve tudo com o ThemeProvider
export default function Atividade6() {
  return (
    <ThemeProvider>
      <ConteudoAtividade />
    </ThemeProvider>
  );
}
