import { useState } from "react";
import { Button, Text, View } from "react-native";

export default function Esconder() {
  const [show, setShow] = useState(false);
  return (
    <View>
      <Button title={show ? "Esconder" : "Mostrar"} onPress={() => setShow(s => !s)} />
      {show && <Text>Detalhes sobre o aplicativo</Text>}
    </View>
  );
}