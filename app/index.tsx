import React, { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { apiIBGE } from "./api";
import { styles } from "./styles";

export default function Index() {
    const [nomes, setNomes] = useState([] as any[]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");
    const [pagina, setPagina] = useState(0);
    const [input, setInput] = useState("");
    function buscar() {
        if (input === "") {
            Alert.alert("Erro", "Digite um nome");
            return;
        }
        setCarregando(true);
        setErro("");
        apiIBGE(input)
            .then(function (dados) {
                const novo = {
                    name: input,
                    data: dados,
                };
                const todos = [];
                for (let i = 0; i < nomes.length; i++) {
                    todos.push(nomes[i]);
                }
                todos.push(novo);
                setNomes(todos);
                setPagina(todos.length - 1);
                setInput("");
                setCarregando(false);
            })
            .catch(function (err) {
                setErro(err.message);
                Alert.alert("Erro", err.message);
                setCarregando(false);
            })
    }
    const nomeAtual = nomes[pagina];
    const nomeData = nomeAtual && nomeAtual.data ? nomeAtual.data : null;
    const displayNome = nomeData
        ? Array.isArray(nomeData)
            ? (nomeData[0] && nomeData[0].nome ? nomeData[0].nome : 'N/A')
            : (nomeData.nome ? nomeData.nome : 'N/A')
        : 'N/A';
    const displayLocalidade = nomeData
        ? Array.isArray(nomeData)
            ? (nomeData[0] && nomeData[0].localidade ? nomeData[0].localidade : '')
            : (nomeData.localidade ? nomeData.localidade : '')
        : '';
    const resArray: Array<any> = nomeData
        ? Array.isArray(nomeData)
            ? (nomeData.length > 0 && nomeData[0] && nomeData[0].res ? nomeData[0].res : [])
            : (nomeData.res ? nomeData.res : [])
        : [];
    function formatPeriodo(periodo: any): string {
        if (!periodo || typeof periodo !== 'string') return '';
        const range = periodo.match(/\[?(\d{4})\s*,\s*(\d{4})\]?/);
        if (range && range.length >= 3) {
            return `De ${range[1]} a ${range[2]}`;
        }
        const single = periodo.match(/(\d{4})/);
        if (single) {
            return `A partir de ${single[1]}`;
        }
        return periodo;
    }
    function formatFrequencia(n: any): string {
        const num = typeof n === 'number' ? n : parseInt(String(n || '0'), 10);
        try {
            return new Intl.NumberFormat('pt-BR').format(num);
        } catch (e) {
            return String(num);
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: "row", gap: 10 }}>
                    <TextInput
                        style={styles.input}
                        placeholder="Fulano"
                        value={input}
                        onChangeText={setInput}
                    />
                    <TouchableOpacity style={styles.botao} onPress={buscar} disabled={carregando}>
                        {carregando ? <ActivityIndicator color="#fff" /> : <Text style={styles.botaoTexto}>Buscar</Text>}
                    </TouchableOpacity>
                </View>
            </View>
            {carregando === true && nomes.length === 0 && (
                <View style={styles.centro}>
                    <ActivityIndicator size="large" color="#7CFC00" />
                    <Text style={styles.textoClaro}>Carregando</Text>
                </View>
            )}
            {carregando === false && nomes.length === 0 && (
                <View style={styles.centro}>
                    <Text style={styles.textoClaro}>Digite um nome e clique em Buscar</Text>
                </View>
            )}
            {nomeAtual !== undefined && carregando === false && nomeAtual.data !== null && nomeAtual.data !== undefined && (
                <ScrollView style={styles.scroll}>
                    <View style={styles.card}>
                        <Text style={styles.nome}>{displayNome}</Text>
                        <Text style={styles.localidade}>{displayLocalidade}</Text>
                    </View>
                    <View style={styles.list}>
                        {resArray.map((r, idx) => (
                            <View key={idx.toString()} style={styles.listItem}>
                                <Text style={styles.listItemTitle}>{formatPeriodo(r.periodo)}</Text>
                                <Text style={{ color: '#666' }}>{formatFrequencia(r.frequencia)} Pessoas Registradas</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            )}
        </View>
    )
}