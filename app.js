/***********************************************************************************************
 * Objetivo: Arquivo responsavek pela cricao da API do projeto de estados e cidades
 * Data: 01/04/2026
 * Autor: Pedro Rodrigues
 * Versão: 1.0
 * 
 * 
 * instalação do express: npm install express --save
 *  dependencia responsavel pela utilizacao do protocolo HTTP para criar uma API
 * 
 * 
 * 
 * instalação do CORS: npm install cors --save
 * dependencia responsavel por permitir ou bloquear o acesso a API, ou seja, definir quais dominios podem acessar a API
 ************************************************************************************************/

// import das dependencias para criar a API
const express = require('express')
const cors = require('cors')


//criando um objeto para manipular o express
const app = express()

//conjunto de permissões a serem aplicadas no CORS da API
const corsOptions = {
    origin: ['*'], // A origem da requisição, podendo ser o IP ou o * que siginifica que qualquer dominio pode acessar a API
    methods: 'GET', //Versao que serao liberados para acessar a API (GET, POST, PUT, DELETE)
    allowedHeaders: ['Content-Type', 'Authorization'] //Tipos de cabeçalhos que serao aceitos pela API
}

app.use(cors(corsOptions)) //aplicando as regras de CORS na API

//Response - Retorno da API
//Request - Chegada de dados na API


const estadosCidades = require('./modulo/array_json.js') //importando o modulo de estados e cidades para ser utilizado na API

//criando EndPoints para a API

//retorna dados do sestados filtradndo pelo uf
app.get('/v1/senai/dados/estado/:uf', function(request, response) {

    let sigla = request.params.uf 
    let estado = estadosCidades.getDadosEstado(sigla)

    response.json(estado)
    response.status(200)
})

//retorna a capital do estado filtrando pela uf
app.get('/v1/senai/capital/estado/:uf', function(request, response) {
    let sigla = request.params.uf 
    let capital = estadosCidades.getCapitalEstado(sigla)

    response.json(capital)
    response.status(200)
})

//retorna a capital de todos os estados do Brasil
app.get('/v1/senai/estados/capital/brasil', function(request, response) {
    let estadosCapital = estadosCidades.getEstadosCapitalBrasil()

    response.json(estadosCapital)
    response.status(200)
})

//retorna os estados do Brasil filtrando pela regiao
app.get('/v1/senai/estados/regiao/:regiao', function(request, response) {
    let regiao = request.params.regiao 
    let estadosRegiao = estadosCidades.getEstadosRegiaoBrasil(regiao)

    response.json(estadosRegiao)
    response.status(200)
})

//retorna as cidades de um estado do Brasil filtrando pela uf
app.get('v1/senai/cidades/estado/:uf', function(request, response) {
    let sigla = request.params.uf 
    let cidadesEstado = estadosCidades.getCidadesEstado(sigla)

    response.json(cidadesEstado)
    response.status(200)
})

//retorna a lista de estados do Brasil
app.get('/v1/senai/estados', function(request, response) {

    let estados = estadosCidades.getListaDeEstados() //utilizando a funcao do modulo de estados e cidades para obter a lista de estados

    if (estados){
        response.status(200)
        response.json(estados)
    }else{
        response.status(404)
        response.json({message: 'Nenhum estado encontrado'}) 
    }
})

app.get('v1/senai/help', function(request, response) {
    let docAPI = {
        "API-description": "API de estados e cidades do Brasil",
        "date": "2026-04-02",
        "Developer": "Pedro Rodrigues",
        "version": "1.0",
        "endpoints": [
            {
                "id": 1,
                "Rota 1": "/v1/senai/dados/estado/sp",
                "obs": "retorna a lista de todos os estados"
            },
            {
                "id": 2,
                "Rota 2": "/v1/senai/capital/estado/sp",
                "obs": "retorna a capital de um estado do Brasil filtrando pela uf"
            },
            {
                "id": 3,
                "Rota 3": "/v1/senai/estados/capital/brasil",
                "obs": "retorna a capital de todos os estados do Brasil"
            },
            {
                "id": 4,
                "Rota 4": "/v1/senai/estados/regiao/norte",
                "obs": "retorna os estados do Brasil filtrando pela regiao"
            },
            {
                "id": 5,
                "Rota 5": "/v1/senai/cidades/estado/sp",
                "obs": "retorna as cidades de um estado do Brasil filtrando pela uf"
            },
            {
                "id": 6,
                "Rota 6": "/v1/senai/estados",
                "obs": "retorna a lista de estados do Brasil"
            }
        ]
    }
})


app.get('/cidades', function(request, response) {
    response.json({message: 'Lista de cidades do Brasil'})
    response.status(200) //status de resposta da API, 200 significa que a requisição foi bem sucedida
})


//definindo a porta de acesso da API, nesse caso a porta 8080, e uma função de callback para ser executada quando a API for iniciada
app.listen(8080, function() {
    console.log('Servidor rodando na porta 8080')
}) 