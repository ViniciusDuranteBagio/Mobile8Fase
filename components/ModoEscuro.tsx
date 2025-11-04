import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const ModoEscuro = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSwitch = () => setIsDarkMode(previousState => !previousState);

  const containerStyle = {
    ...styles.container,
    backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
  };

  const textStyle = {
    ...styles.text,
    color: isDarkMode ? '#FFFFFF' : '#000000',
  };

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>Modo Escuro</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
        onValueChange={toggleSwitch}
        value={isDarkMode}
      />
      <Text style={textStyle}>
        {isDarkMode ? 'Modo Escuro Ativado' : 'Modo Claro Ativado'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginVertical: 20,
  },
});

export default ModoEscuro;