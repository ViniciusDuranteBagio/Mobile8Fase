import { Image, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Olá, React Native!</Text>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/919/919851.png',
          }}
          style={styles.image}
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
    backgroundColor: '#fff',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 150,
  },
  text: {
    fontSize: 24,
    color: '#1E90FF',
  },
  image: {
    width: 200,
    height: 200,
  },
});
