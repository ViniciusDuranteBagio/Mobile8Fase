/**
 * App.js - Arquivo Principal
 * Orquestra a navegação e gerencia o estado global do aplicativo
 * Utiliza arquitetura em camadas para separação de responsabilidades
 */

import { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import CalculateScreen from './screens/CalculateScreen';
import HistoryScreen from './screens/HistoryScreen';
import HomeScreen from './screens/HomeScreen';
import { commonStyles } from './styles/theme';

export default function App() {
  // Estado para controlar a tela atual
  const [currentScreen, setCurrentScreen] = useState('home');
  
  // Estado para armazenar o histórico de consultas
  const [historico, setHistorico] = useState([]);
  
  // Função para navegar entre telas
  const handleNavigate = (screen) => {
    setCurrentScreen(screen);
  };
  
  // Função para adicionar item ao histórico
  const handleAddToHistory = (item) => {
    setHistorico(prev => [item, ...prev]);
  };
  
  // Renderizar a tela atual baseado no estado
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} />;
      
      case 'calcular':
        return (
          <CalculateScreen 
            onNavigate={handleNavigate}
            onAddToHistory={handleAddToHistory}
          />
        );
      
      case 'historico':
        return (
          <HistoryScreen 
            onNavigate={handleNavigate}
            historico={historico}
          />
        );
      
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };
  
  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <StatusBar barStyle="dark-content" />
      {renderScreen()}
    </SafeAreaView>
  );
}
