import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="ex1"
        options={{
          tabBarLabel: "ex1",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size ?? 22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ex2"
        options={{
          tabBarLabel: "ex2",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="chatbubbles-outline"
              size={size ?? 22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ex3"
        options={{
          tabBarLabel: "ex3",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="checkmark-circle-outline"
              size={size ?? 22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ex4"
        options={{
          tabBarLabel: "ex4",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="moon-outline" size={size ?? 22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
