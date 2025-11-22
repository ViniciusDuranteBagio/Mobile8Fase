import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
    <Stack
      screenOptions={{
        headerShown: false, // Remove header de todas as páginas
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="digimon/[id]" />
    </Stack>
    </ThemeProvider>
  );
}
