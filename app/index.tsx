import React, { useState } from "react";
import { ActivityIndicator, Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { apiClima } from "./api";
import { styles } from "./styles";

export default function Index() {
  const [cidades, setCidades] = useState([] as any[]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [pagina, setPagina] = useState(0);
  const [input, setInput] = useState("");

  function buscar() {
    if (input === "") {
      Alert.alert("Erro", "Digite uma cidade");
      return;
    }

    let cidadeJaBuscada = false;
    for (let i = 0; i < cidades.length; i++) {
      if (cidades[i].city.toLowerCase() === input.toLowerCase()) {
        cidadeJaBuscada = true;
        break;
      }
    }
    if (cidadeJaBuscada) {
      Alert.alert("Aviso", "Cidade já buscada");
      return;
    }
    setCarregando(true);
    setErro("");

    apiClima(input)
      .then(function(dados) {
        const nova = {
          city: input,
          data: dados,
        };
        const todas = [];
        for (let i = 0; i < cidades.length; i++) {
          todas.push(cidades[i]);
        }
        todas.push(nova);
        setCidades(todas);
        setPagina(todas.length - 1);
        setInput("");
        setCarregando(false);
      })
      .catch(function(err) {
        setErro(err.message);
        Alert.alert("Erro", err.message);
        setCarregando(false);
      });
  }

  function proxima() {
    if (pagina < cidades.length - 1) {
      setPagina(pagina + 1);
    }
  }

  function anterior() {
    if (pagina > 0) {
      setPagina(pagina - 1);
    }
  }

  const cidadeAtual = cidades[pagina];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Clima</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TextInput
            style={styles.input}
            placeholder="Cidade..."
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.botao} onPress={buscar} disabled={carregando}>
            {carregando ? <ActivityIndicator color="#fff" /> : <Text style={styles.botaoTexto}>Buscar</Text>}
          </TouchableOpacity>
        </View>
        {erro !== "" && cidades.length === 0 && <Text style={styles.erro}>{erro}</Text>}
      </View>

      {carregando === true && cidades.length === 0 && (
        <View style={styles.centro}>
          <ActivityIndicator size="large" color="#42b883" />
          <Text style={styles.textoClaro}>Carregando...</Text>
        </View>
      )}

      {carregando === false && cidades.length === 0 && (
        <View style={styles.centro}>
          <Text style={styles.textoClaro}>Digite uma cidade e clique em Buscar</Text>
        </View>
      )}

      {cidadeAtual !== undefined && carregando === false && cidadeAtual.data !== null && cidadeAtual.data !== undefined && (
        <ScrollView style={styles.scroll}>
          <View style={styles.card}>
            <Text style={styles.nome}>{cidadeAtual.data && cidadeAtual.data.location ? cidadeAtual.data.location.name : "N/A"}</Text>
            <Text style={styles.pais}>{cidadeAtual.data && cidadeAtual.data.location ? cidadeAtual.data.location.country : ""}</Text>

            {cidadeAtual.data && cidadeAtual.data.current && cidadeAtual.data.current.weather_icons !== undefined && cidadeAtual.data.current.weather_icons.length > 0 && (
              <Image source={{ uri: cidadeAtual.data.current.weather_icons[0] }} style={styles.icone} />
            )}

            <View style={styles.tempBox}>
              <Text style={styles.temp}>{cidadeAtual.data && cidadeAtual.data.current && cidadeAtual.data.current.temperature != null ? cidadeAtual.data.current.temperature + "°C" : "N/A"}</Text>
              <Text style={styles.textoClaro}>Sensação: {cidadeAtual.data && cidadeAtual.data.current && cidadeAtual.data.current.feelslike != null ? cidadeAtual.data.current.feelslike + "°C" : "N/A"}</Text>
            </View>

            <View style={styles.info}>
              <View style={styles.linha}>
                <Text style={styles.textoClaro}>Umidade:</Text>
                <Text style={styles.valor}>{cidadeAtual.data && cidadeAtual.data.current ? cidadeAtual.data.current.humidity + "%" : "N/A"}</Text>
              </View>
              <View style={styles.linha}>
                <Text style={styles.textoClaro}>Vento:</Text>
                <Text style={styles.valor}>{cidadeAtual.data && cidadeAtual.data.current ? cidadeAtual.data.current.wind_speed + " km/h" : "N/A"}</Text>
              </View>
              <View style={styles.linha}>
                <Text style={styles.textoClaro}>Chuva:</Text>
                <Text style={styles.valor}>{cidadeAtual.data && cidadeAtual.data.current ? cidadeAtual.data.current.precip + " mm" : "N/A"}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}

      {cidades.length > 0 && (
        <View style={styles.nav}>
          <TouchableOpacity style={styles.botaoNav} onPress={anterior} disabled={pagina === 0}>
            <Text style={pagina === 0 ? styles.desabilitado : styles.botaoNavTexto}>Anterior</Text>
          </TouchableOpacity>
          <Text style={styles.textoClaro}>{pagina + 1} de {cidades.length}</Text>
          <TouchableOpacity style={styles.botaoNav} onPress={proxima} disabled={pagina === cidades.length - 1}>
            <Text style={pagina === cidades.length - 1 ? styles.desabilitado : styles.botaoNavTexto}>Próxima</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
