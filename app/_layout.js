import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="rick"
        options={{
          title: "Rick and Morty",
        }}
      />
    </Tabs>
  );
}
