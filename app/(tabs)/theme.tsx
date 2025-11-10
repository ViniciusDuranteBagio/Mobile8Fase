import { createContext, useContext, useState } from "react";
import { Button, Text, View } from "react-native";

function ThemedTitle() {
  const theme = useContext(ThemeContext);
  return <Text style={{ color: theme === "dark" ? "white" : "black" }}>Título</Text>;
}

const ThemeContext = createContext<string>("light");
export default function Theme() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={theme}>
      <View style={{ flex:1, justifyContent:"center", alignItems:"center",
                     backgroundColor: theme === "dark" ? "#111" : "#eee" }}>
        <ThemedTitle />
        <Button
          title={`Trocar para ${theme === "dark" ? "light" : "dark"}`}
          onPress={() => setTheme(t => (t === "dark" ? "light" : "dark"))}
        />
      </View>
    </ThemeContext.Provider>
  );
}
