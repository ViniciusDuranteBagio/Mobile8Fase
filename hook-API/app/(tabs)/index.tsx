import React, { useState, useEffect, useCallback, createContext, useContext } from "react";
import { View, Text, Button, Alert, StyleSheet, Animated, ScrollView } from "react-native";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  themeStyles: { backgroundColor: string; color: string; cardColor: string };
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default function App() {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const themeStyles = {
    backgroundColor: theme === "light" ? "#F3F4F6" : "#111827",
    color: theme === "light" ? "#111827" : "#F3F4F6",
    cardColor: theme === "light" ? "#FFFFFF" : "#1F2937",
  };

  return (
    <ThemeContext.Provider value={{ theme, themeStyles, toggleTheme }}>
      <MainScreen />
    </ThemeContext.Provider>
  );
}

function MainScreen() {
  const [numero, setNumero] = useState<number>(0);
  const [mostrarTexto, setMostrarTexto] = useState<boolean>(true);
  const scale = new Animated.Value(1);

  const { themeStyles, toggleTheme, theme } = useContext(ThemeContext)!;

  // --- (3) useEffect para logar mudanças no contador ---
  useEffect(() => {
    console.log("O valor do contador mudou:", numero);
  }, [numero]);

  // --- (4) useEffect para alertar uma vez ---
  useEffect(() => {
    const timer = setTimeout(() => {
      alert("Bem-vindo!");
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // --- (5) useCallback ---
  const dizerOla = useCallback(() => {
    console.log("Olá, viajante do espaço!");
    Alert.alert("Olá!", "Viajante do espaço diz oi!");
  }, []);

  // --- animação no número ---
  const animate = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 1.2, duration: 150, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
  };

  useEffect(() => {
    animate();
  }, [numero]);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: themeStyles.backgroundColor }}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={[styles.title, { color: themeStyles.color }]}>
        Hook e API
      </Text>

      {/* (1) Contador */}
      <Card title="1️⃣ Contador com useState">
        <Animated.Text
          style={[
            styles.counterNumber,
            { color: themeStyles.color, transform: [{ scale }] },
          ]}
        >
          {numero}
        </Animated.Text>
        <View style={styles.row}>
          <Button title="Aumentar" onPress={() => setNumero(numero + 1)} />
          <Button title="Diminuir" onPress={() => setNumero(numero - 1)} />
        </View>
      </Card>

      {/* (2) Mostrar / Esconder texto */}
      <Card title="2️⃣ Mostrar / Esconder texto">
        <Button
          title={mostrarTexto ? "Esconder" : "Mostrar"}
          onPress={() => setMostrarTexto(!mostrarTexto)}
        />
        {mostrarTexto && (
          <Text style={[styles.text, { color: themeStyles.color, marginTop: 8 }]}>
            Texto visível! 👀
          </Text>
        )}
      </Card>

      {/* (5) useCallback */}
      <Card title="5️⃣ Função memorizada com useCallback">
        <Button title="Dizer Olá" onPress={dizerOla} />
      </Card>

      {/* (6) Alternância de tema */}
      <Card title="6️⃣ Alternância de tema global">
        <Text style={[styles.text, { color: themeStyles.color }]}>
          Tema atual: {theme === "light" ? "🌞 Claro" : "🌙 Escuro"}
        </Text>
        <Button title="Alternar Tema" onPress={toggleTheme} />
      </Card>
    </ScrollView>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  const themeContext = useContext(ThemeContext);
  const themeColor = themeContext?.themeStyles.cardColor ?? "#fff";
  const textColor = themeContext?.themeStyles.color ?? "#000";

  return (
    <View style={[styles.card, { backgroundColor: themeColor }]}>
      <Text style={[styles.cardTitle, { color: textColor }]}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginVertical: 20,
  },
  card: {
    width: "95%",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  counterNumber: {
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
});
