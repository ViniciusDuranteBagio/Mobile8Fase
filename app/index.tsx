import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { fetchWeatherData } from "./api";

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

    let tem = false;
    for (let i = 0; i < cidades.length; i++) {
      if (cidades[i].city.toLowerCase() === input.toLowerCase()) {
        tem = true;
        break;
      }
    }
    if (tem === true) {
      Alert.alert("Aviso", "Cidade já buscada");
      return;
    }

    setCarregando(true);
    setErro("");

    fetchWeatherData(input)
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
              <Text style={styles.textoClaro}>{cidadeAtual.data && cidadeAtual.data.current && Array.isArray(cidadeAtual.data.current.weather_descriptions) && cidadeAtual.data.current.weather_descriptions.length > 0 ? cidadeAtual.data.current.weather_descriptions[0] : "Sem descrição"}</Text>
              <Text style={styles.textoClaro}>Sensação: {cidadeAtual.data && cidadeAtual.data.current && cidadeAtual.data.current.feelslike != null ? cidadeAtual.data.current.feelslike + "°C" : "N/A"}</Text>
            </View>

            <View style={styles.info}>
              <View style={styles.linha}>
                <Text style={styles.textoClaro}>Umidade:</Text>
                <Text style={styles.valor}>{cidadeAtual.data && cidadeAtual.data.current ? cidadeAtual.data.current.humidity + "%" : "N/A"}</Text>
              </View>
              <View style={styles.linha}>
                <Text style={styles.textoClaro}>Vento:</Text>
                <Text style={styles.valor}>{cidadeAtual.data && cidadeAtual.data.current ? cidadeAtual.data.current.wind_speed + " km/h " + cidadeAtual.data.current.wind_dir : "N/A"}</Text>
              </View>
              <View style={styles.linha}>
                <Text style={styles.textoClaro}>Pressão:</Text>
                <Text style={styles.valor}>{cidadeAtual.data && cidadeAtual.data.current ? cidadeAtual.data.current.pressure + " mb" : "N/A"}</Text>
              </View>
              <View style={styles.linha}>
                <Text style={styles.textoClaro}>UV:</Text>
                <Text style={styles.valor}>{cidadeAtual.data && cidadeAtual.data.current ? cidadeAtual.data.current.uv_index : "N/A"}</Text>
              </View>
              <View style={styles.linha}>
                <Text style={styles.textoClaro}>Visibilidade:</Text>
                <Text style={styles.valor}>{cidadeAtual.data && cidadeAtual.data.current ? cidadeAtual.data.current.visibility + " km" : "N/A"}</Text>
              </View>
              <View style={styles.linha}>
                <Text style={styles.textoClaro}>Chuva:</Text>
                <Text style={styles.valor}>{cidadeAtual.data && cidadeAtual.data.current ? cidadeAtual.data.current.precip + " mm" : "N/A"}</Text>
              </View>
              <View style={styles.linha}>
                <Text style={styles.textoClaro}>Nuvens:</Text>
                <Text style={styles.valor}>{cidadeAtual.data && cidadeAtual.data.current ? cidadeAtual.data.current.cloudcover + "%" : "N/A"}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
  },
  header: {
    backgroundColor: "#16213e",
    padding: 20,
    paddingTop: 60,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#42b883",
    textAlign: "center",
    marginBottom: 15,
  },
  busca: {
    flexDirection: "row",
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#0f3460",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  botao: {
    backgroundColor: "#42b883",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
    minWidth: 80,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
  erro: {
    color: "#ff6b6b",
    fontSize: 12,
    marginTop: 10,
    textAlign: "center",
  },
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scroll: {
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: "#16213e",
    borderRadius: 12,
    padding: 20,
  },
  nome: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#42b883",
    textAlign: "center",
    marginBottom: 5,
  },
  pais: {
    fontSize: 16,
    color: "#e0e0e0",
    textAlign: "center",
    marginBottom: 20,
  },
  icone: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginVertical: 15,
  },
  tempBox: {
    alignItems: "center",
    marginVertical: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#42b883",
  },
  temp: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#42b883",
    marginBottom: 10,
  },
  info: {
    marginTop: 20,
  },
  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#0f3460",
  },
  valor: {
    color: "#42b883",
    fontWeight: "600",
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#16213e",
  },
  botaoNav: {
    backgroundColor: "#42b883",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    minWidth: 100,
  },
  botaoNavTexto: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  desabilitado: {
    color: "#999",
  },
  textoClaro: {
    color: "#fff",
  },
});
