import { Text, View, Image, Button } from "react-native";
import { router } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#FAF0E6",
        gap: 32
      }}
    >
      <Text style={{
        fontSize: 20,
        color: "#272757"
        }}>
        Olá
      </Text>
      <Image
        source={{
          uri: "https://images.pexels.com/photos/26976587/pexels-photo-26976587.jpeg"
        }}
        style={{
          width: 200,
          height: 200,
          borderRadius: 10
          }}
      />
      <Button onPress={() => router.navigate("/execicio2")} title="Avançar"/>
    </View>
  );
}
