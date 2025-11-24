import { useState, useEffect } from "react";
import { Button, View, Image, Text } from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [anyError, setAnyError] = useState(false);

  const fetchImageUrl = async () => {
    try {
      const response = await axios.get(
        "https://dog.ceo/api/breeds/image/random"
      );
      setImageUrl(response.data.message);
      setAnyError(false);
    } catch (erro) {
      setAnyError(true);
    }
  };

  useEffect(() => {
    fetchImageUrl();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
      }}
    >
      <View
        style={{
          width: "80%",
          height: "80%",
          borderWidth: 3,
          borderColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {anyError ? (
          <Text style={{ color: "white", fontSize: 28 }}>
            Error ao buscar imagem
          </Text>
        ) : (
          <>
            {imageUrl === "" ? (
              <Text style={{ color: "white", fontSize: 28 }}>Carregando</Text>
            ) : (
              <Image
                source={{ uri: imageUrl }}
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </>
        )}
      </View>
      <View style={{ width: "80%" }}>
        <Button
          title="Buscar outra foto"
          onPress={() => {
            fetchImageUrl();
            setImageUrl("");
          }}
          style={{ height: "100%", width: "100%" }}
        />
      </View>
    </SafeAreaView>
  );
}
