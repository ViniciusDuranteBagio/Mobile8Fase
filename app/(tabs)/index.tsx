import { 
  Image, 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  Switch 
} from 'react-native';
import { useState } from 'react';

export default function HomeScreen() {
  // Estados para os exercícios
  const [nome, setNome] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Função para validação do nome (Exercício 3)
  const handleButtonPress = () => {
    if (nome.trim() === '') {
      Alert.alert('Aviso', 'Digite seu nome primeiro');
    } else {
      Alert.alert('Bem-vindo!', `Seja bem-vindo(a), ${nome}!`);
    }
  };

  // Estilos dinâmicos baseados no tema
  const dynamicStyles = {
    container: {
      ...styles.container,
      backgroundColor: isDarkMode ? '#000000' : '#ffffff',
    },
    text: {
      ...styles.text,
      color: isDarkMode ? '#ffffff' : '#1E90FF',
    },
    greetingText: {
      ...styles.greetingText,
      color: isDarkMode ? '#ffffff' : '#333333',
    },
    themeText: {
      ...styles.themeText,
      color: isDarkMode ? '#ffffff' : '#333333',
    },
    textInput: {
      ...styles.textInput,
      backgroundColor: isDarkMode ? '#333333' : '#f0f0f0',
      color: isDarkMode ? '#ffffff' : '#000000',
      borderColor: isDarkMode ? '#666666' : '#cccccc',
    },
  };

  return (
    <View style={dynamicStyles.container}>
      {/* Exercício 1: Text e Image organizados com View */}
      <Text style={dynamicStyles.text}>Olá, React Native!</Text>
      
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/919/919851.png',
        }}
        style={styles.image}
      />

      {/* Exercício 2: TextInput para nome */}
      <View style={styles.inputContainer}>
        <TextInput
          style={dynamicStyles.textInput}
          placeholder="Digite seu nome"
          placeholderTextColor={isDarkMode ? '#cccccc' : '#666666'}
          value={nome}
          onChangeText={setNome}
        />
        
        {/* Saudação personalizada */}
        {nome ? (
          <Text style={dynamicStyles.greetingText}>
            Olá, {nome}!
          </Text>
        ) : null}
      </View>

      {/* Exercício 3: Botão com validação */}
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Clique aqui</Text>
      </TouchableOpacity>

      {/* Exercício 4: Switch para modo escuro */}
      <View style={styles.themeContainer}>
        <Text style={dynamicStyles.themeText}>
          Modo {isDarkMode ? 'Escuro' : 'Claro'}
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
    borderRadius: 10,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  textInput: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  themeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 20,
  },
  themeText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
