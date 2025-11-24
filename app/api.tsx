const API_KEY = "f8039cc52d4ea640ff0c9164b5371e01";

export function apiClima(nomeCidade: string) {
  if (nomeCidade === "") {
    throw new Error("Digite o nome de uma cidade");
  }

  const url = "http://api.weatherstack.com/current?access_key=" + API_KEY + "&query=" + nomeCidade + "&units=m";
  
  return fetch(url)
    .then(function(resposta) {
      if (resposta.ok === false) {
        throw new Error("Erro ao buscar dados");
      }
      return resposta.json();
    })
    .then(function(dados) {
      if (dados.error !== undefined) {
        throw new Error(dados.error.info || "Erro");
      }
      return dados;
    });
}
