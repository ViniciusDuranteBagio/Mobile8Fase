import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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

