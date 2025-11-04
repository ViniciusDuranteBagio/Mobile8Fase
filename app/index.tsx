import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import ModoEscuro from '../components/ModoEscuro';
import PrimeiraTela from '../components/PrimeiraTela';
import SaudacaoPersonalizada from '../components/SaudacaoPersonalizada';

const Tab = createBottomTabNavigator();

export default function Index() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'help-outline';

          if (route.name === 'Primeira Tela') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Saudação') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Modo Escuro') {
            iconName = focused ? 'moon' : 'moon-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4B0082',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name='Primeira Tela'
        component={PrimeiraTela}
        options={{ headerShown: true }}
      />
      <Tab.Screen
        name='Saudação'
        component={SaudacaoPersonalizada}
        options={{ headerShown: true }}
      />
      <Tab.Screen
        name='Modo Escuro'
        component={ModoEscuro}
        options={{ headerShown: true }}
      />
    </Tab.Navigator>
  );
}
