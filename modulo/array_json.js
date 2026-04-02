/*****************************************************************
 * Objetivo: criar todas as funções em um arquivo a parte para que no futuro possamos integrar em uma “API bem legal”, que terá como objetivo trazer informações sobre os estados do Brasil.
 * data: 2026-03-18
 * nome: pedro rodrigues
 * versao: 1.0
 *****************************************************************/

//                                 IMPORTANDO O ARQUIVO DE DADOS (API)                                    


// 1. Importa o objeto principal
const dados = require('./estados_cidades.js'); 


// Cria uma variável que aponta direto para a lista de estados
const listaDeEstados = dados.listaDeEstados.estados;

//Conta a quantidade de estados
const contarEstados = function() {
    return listaDeEstados.length;
};



//                                      MANIPULANDO ARRAY E JSON


// 1. retorna a lista de todos os estados do Brasil.
const getListaDeEstados = function() {
     let siglas = []
    
    listaDeEstados.forEach(function(estado) {
        siglas.push(estado.sigla);
    });
    
    return siglas;
};

// 2. retorna as informações referente a um estado do Brasil, onde a sigla do estado será o critério de filtro.
const getDadosEstado = function() {
    let dadosEstado = []
    let dadosEstados = 'RJ'

    listaDeEstados.forEach(function(estado) {
        if (estado.sigla === dadosEstados) {
            dadosEstado.push({
                uf: estado.sigla,
                descricao: estado.nome,
                capital: estado.capital,
                regiao: estado.regiao
            });
        }
    });

    return dadosEstado;
}

// 3. retorna as informações referente a capital de um estado do Brasil, onde a sigla do estado será o critério de filtro.
const getCapitalEstado = function() {
    let capitalEstado = []
    let dadosEstados = 'SP'

    listaDeEstados.forEach(function(estado) {
        if (estado.sigla === dadosEstados) {
            capitalEstado.push({
                uf : estado.sigla, descricao : estado.nome, capital : estado.capital
            });
        }
    });

    return capitalEstado;
}

// 4. que retorna as informações referente aos estados do Brasil conforme a sua região, onde a região será o critério de filtro.
const getEstadosRegiao = function(){
    let estadosRegiao = []
    let dadosRegiao = 'Sul'

    listaDeEstados.forEach(function(estado) {
        if (estado.regiao === dadosRegiao) {
            estadosRegiao.push({
                uf : estado.nome, descricao : estado.nome
            });
        }
    });

    return estadosRegiao;
}

//                                                  DESAFIO BEM LEGAL


// 1. retorna as informações referente aos estados que formam a capital do Brasil.
const getCapitalPais = function() {
    let capitalPais = []
    let dadosPais = 'Brasil'

    if (dadosPais.toUpperCase() !== 'BRASIL') {
        return capitaisPais
    }

    listaDeEstados.forEach(function(estado) {
        if (estado.capital_pais) {
            capitalPais.push({
                uf: estado.sigla,
                descricao: estado.nome,
                capital: estado.capital,
                regiao: estado.regiao,
                capital_pais_ano_inicio: estado.capital_pais.ano_inicio,
                capital_pais_ano_fim: estado.capital_pais.ano_fim
            });
        }
    })

    return capitalPais
}

// 2. retorna uma lista de cidades, filtrado pela sigla do estado.
const getCidades = function() {
    let cidades = []
    let dadosCidade = 'AC'

    listaDeEstados.forEach(function(estado) {
        estado.cidades.forEach(function(cidade) {
            if (cidade.nome === dadosCidade) {
                cidades.push({
                    uf : estado.sigla,
                    descricao : estado.nome,
                    quantidade_cidades : estado.cidades.length,
                    cidades: estado.cidades.map(c => c.nome)
                });
            }
        });
    });

    return cidades;
}




// Chama a função para testar
console.log(getCapitalPais());

module.exports = {
    getListaDeEstados,
    getDadosEstado,
    getCapitalEstado,
    getEstadosRegiao,
    getCapitalPais,
    getCidades
}