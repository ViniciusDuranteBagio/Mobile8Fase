import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HapticTab } from '@/components/haptic-tab';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#006EFF',
          height: 50 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom - 2 : 10,
          paddingTop: 5,
        },
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor: '#E3F2FF',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Pokédex',
          tabBarIcon: ({ color }) => (
            <View>
              <MaterialIcons name="catching-pokemon" size={28} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Treinador',
          tabBarIcon: ({ color }) => (
            <View>
              <MaterialCommunityIcons name="pokemon-go" size={28} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
