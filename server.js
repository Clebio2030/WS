// usei o express pra criar e configurar meu servidor
const express = require('express')
const server = express()

const ideas = [
    {
        img: "https://cdn-icons-png.flaticon.com/128/3015/3015491.png",
        title:"Cursos de Programação",
        category: "Estudos",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        url:"https://rocketseat.com.br"
    },
    {
        img: "https://cdn-icons-png.flaticon.com/128/4190/4190739.png",
        title:"Exercicios",
        category: "Saúde",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        url:"https://rocketseat.com.br"
    },
    {
        img: "https://cdn-icons-png.flaticon.com/128/2981/2981993.png",
        title:"Meditação",
        category: "Saúde",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        url:"https://rocketseat.com.br"
    },
    {
        img: "https://cdn-icons-png.flaticon.com/128/2159/2159722.png",
        title:"Karaokê",
        category: "Diversão em Família",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        url:"https://rocketseat.com.br"
    },
    {
        img: "https://cdn-icons-png.flaticon.com/128/2159/2159722.png",
        title:"Pintura",
        category: "Criatividade",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        url:"https://rocketseat.com.br"
    },
    {
        img: "https://cdn-icons-png.flaticon.com/128/2159/2159722.png",
        title:"Recortes",
        category: "Criatividade",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        url:"https://rocketseat.com.br"
    }
]

// configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))

// configuração do nunjucks

const nunjucks = require("nunjucks")
const { last } = require('nunjucks/src/filters')
nunjucks.configure("views", {
    express: server,
    noCache: true, // boolean
})

// criei uma rota /
// e capturo o pedido do cliente para responder
server.get("/", function(req, res) {


    const reversedIdeas = [...ideas].reverse()

    let lastIdeas = []
    for (let idea of reversedIdeas){
       if (lastIdeas.length <2) {
        lastIdeas.push(idea)
       }
    }

    
    return res.render("index.html", { ideas: lastIdeas })
})

server.get("/ideias", function(req, res) {
    const reversedIdeas = [...ideas].reverse()
    return res.render("ideias.html", {ideas: reversedIdeas})
})

// liguei meu servidor na porta 3000
server.listen(3000)

