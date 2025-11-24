import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";


<Tabs>
  <Tabs.Screen
    name="index"
    options={{
      title: "Home",
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="home" size={size} color={color} />
      ),
    }}
  />


  <Tabs.Screen
    name="profile"
    options={{
      title: "Perfil",
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="person-circle" size={size} color={color} />
      ),
    }}
  />
</Tabs>
