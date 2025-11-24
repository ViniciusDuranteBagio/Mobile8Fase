import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "PressStart2P": require("@/assets/fonts/PressStart2P-vaV7.ttf"),
  });
  return (
    
    <ThemeProvider value={DefaultTheme}>
    <Stack
      screenOptions={{
        headerShown: false, // Remove header de todas as páginas
      }}
    >
      <Stack.Screen name="list" />
      <Stack.Screen name="digimon/[id]" />
    </Stack>
    </ThemeProvider>
  );
}
