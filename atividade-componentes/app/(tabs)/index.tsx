import React, { useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {
  const [nome, setNome] = useState('');
  const [modoEscuro, setModoEscuro] = useState(false);

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

  const tema = {
    fundo: modoEscuro ? '#000000' : '#FFFFFF',
    texto: modoEscuro ? '#FFFFFF' : '#1E90FF',
    inputBorda: modoEscuro ? '#888' : '#ccc',
    botao: modoEscuro ? '#4444FF' : '#1E90FF',
  };

  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, { color: tema.texto }]}>
          {modoEscuro ? '🌙' : '☀️'}
        </Text>
        <Switch
          value={modoEscuro}
          onValueChange={setModoEscuro}
          thumbColor={modoEscuro ? '#fff' : '#1E90FF'}
          trackColor={{ false: '#aaa', true: '#4444FF' }}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.leftSide}>
          <Text style={[styles.text, { color: tema.texto }]}>
            Insira seu nome abaixo:
          </Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: tema.inputBorda, color: tema.texto },
            ]}
            placeholder="Digite seu nome"
            placeholderTextColor={modoEscuro ? '#888' : '#999'}
            value={nome}
            onChangeText={setNome}
          />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: tema.botao }]}
            onPress={validarNome}
          >
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rightSide}>
          <Text style={[styles.text, { color: tema.texto }]}>
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
  switchContainer: {
    position: 'absolute',
    top: 50,
    right: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  switchLabel: {
    fontSize: 22,
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