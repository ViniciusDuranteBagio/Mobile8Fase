import React, { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {
  const [nome, setNome] = useState('');

  const validarNome = () => {
    if (nome.trim() === '') {
      if (Platform.OS === 'web') {
        alert('Digite seu nome primeiro');
      } else {
        Alert.alert('Atenção', 'Digite seu nome primeiro');
      }
    } else {
      if (Platform.OS === 'web') {
        alert(`Bem-vindo, ${nome}!`);
      } else {
        Alert.alert('Bem-vindo!', `Olá, ${nome}!`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Lado esquerdo */}
        <View style={styles.leftSide}>
          <Text style={styles.text}>Insira seu nome abaixo:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            value={nome}
            onChangeText={setNome}
          />
          <TouchableOpacity style={styles.button} onPress={validarNome}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>

        {/* Lado direito */}
        <View style={styles.rightSide}>
          <Text style={styles.text}>
            {nome ? `Olá, ${nome}!` : 'Olá, visitante!'}
          </Text>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/919/919851.png',
            }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flexWrap: 'wrap',
  },
  leftSide: {
    alignItems: 'center',
    flex: 1,
    minWidth: 250,
  },
  rightSide: {
    alignItems: 'center',
    flex: 1,
    minWidth: 250,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    width: '90%',
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 24,
    color: '#1E90FF',
    marginBottom: 10,
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});
