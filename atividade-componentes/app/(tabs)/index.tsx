import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';

export default function HomeScreen() {
  const [nome, setNome] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.container}>
          <Text style={styles.text}>
            {'Insira seu nome abaixo:'}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            value={nome}
            onChangeText={setNome}
          />
        </View>
        <View style={styles.rightSide}>
          <Text style={styles.text}>
            {nome ? `Olá, ${nome}!` : 'Olá, visitante!'}
          </Text>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/919/919851.png',
            }}
            style={styles.image}
          />
        </View>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 150,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    width: 250,
    fontSize: 16,
  },
  rightSide: {
    alignItems: 'center',
    width: 300,
  },
  text: {
    fontSize: 24,
    color: '#1E90FF',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
});
