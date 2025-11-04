// app/(tabs)/profile.tsx
import React, { useState } from 'react';
import { Alert, Button, Image, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

export default function ProfileScreen() {
  const [nome, setNome] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handlePress = () => {
    if (nome.trim() === '') {
      Alert.alert('Digite seu nome primeiro');
    } else {
      Alert.alert('Bem-vindo!');
    }
  };

  const toggleSwitch = () => setIsDarkMode((prev) => !prev);

  // Define estilos dinâmicos com base no tema
  const themeStyles = isDarkMode ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, { backgroundColor: themeStyles.backgroundColor }]}>
      {/* SWITCH PARA MUDAR O TEMA */}
      <Switch
        value={isDarkMode}
        onValueChange={toggleSwitch}
        thumbColor={isDarkMode ? '#fff' : '#000'}
        trackColor={{ false: '#999', true: '#007AFF' }}
      />

      {/* EXERCÍCIO 1 */}
      <Text style={[styles.title, { color: themeStyles.textColor }]}>Olá, React Native</Text>
      <Image
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        style={styles.image}
      />

      {/* EXERCÍCIO 2 */}
      <TextInput
        style={[styles.input, { color: themeStyles.textColor, borderColor: themeStyles.textColor }]}
        placeholder="Digite seu nome"
        placeholderTextColor={isDarkMode ? '#AAA' : '#555'}
        value={nome}
        onChangeText={setNome}
      />
      <Text style={[styles.greeting, { color: themeStyles.textColor }]}>
        {nome ? `Olá, ${nome}` : 'Digite seu nome acima'}
      </Text>

      {/* EXERCÍCIO 3 */}
      <Button title="Enviar" onPress={handlePress} color={isDarkMode ? '#888' : '#007AFF'} />
    </View>
  );
}

const lightTheme = {
  backgroundColor: '#F5F5F5',
  textColor: '#000000',
};

const darkTheme = {
  backgroundColor: '#000000',
  textColor: '#FFFFFF',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    width: '80%',
    backgroundColor: 'transparent',
    marginBottom: 15,
  },
  greeting: {
    fontSize: 18,
    marginBottom: 20,
  },
});
