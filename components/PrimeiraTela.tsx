import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PrimeiraTela = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Olá, React Native</Text>
      <Image
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        style={styles.image}
      />
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
    fontSize: 24,
    color: '#4B0082', // Cor índigo
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default PrimeiraTela;