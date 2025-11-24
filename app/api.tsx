export function apiIBGE(nomePessoa: String) {
    if (nomePessoa === ""){
        throw new Error("Digite o nome de uma pessoa");
    }
const url = "https://servicodados.ibge.gov.br/api/v2/censos/nomes/"+nomePessoa;
return fetch(url)
    .then(function(res){
        if (res.ok === false) {
            throw new Error("Erro ao buscar informações");
        }
        return res.json();
    })
    .then(function(dados){
        if(dados.error !== undefined){
            throw new Error(dados.error.info || "Erro");
        }
        return dados;
    });
}