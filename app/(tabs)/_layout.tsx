import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Personagens" }} />
      <Tabs.Screen name="search" options={{ title: "Buscar" }} />
    </Tabs>
  );
}
