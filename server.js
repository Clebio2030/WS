// usei o express pra criar e configurar meu servidor
const express = require('express')
const server = express()

const db = require("./db")

const port = process.env.PORT || 3001;

// const ideas = [
//     {
//         img: "https://cdn-icons-png.flaticon.com/128/3015/3015491.png",
//         title:"Cursos de Programação",
//         category: "Estudos",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//         url:"https://rocketseat.com.br"
//     },
//     {
//         img: "https://cdn-icons-png.flaticon.com/128/3784/3784470.png",
//         title:"Exercicios",
//         category: "Saúde",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//         url:"https://rocketseat.com.br"
//     },
//     {
//         img: "https://cdn-icons-png.flaticon.com/128/1509/1509540.png",
//         title:"Meditação",
//         category: "Saúde",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//         url:"https://rocketseat.com.br"
//     },
//     {
//         img: "https://cdn-icons-png.flaticon.com/128/2159/2159722.png",
//         title:"Karaokê",
//         category: "Diversão em Família",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//         url:"https://rocketseat.com.br"
//     },
//     {
//         img: "https://cdn-icons-png.flaticon.com/128/1157/1157969.png",
//         title:"Pintura",
//         category: "Criatividade",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//         url:"https://rocketseat.com.br"
//     },
//     {
//         img: "https://cdn-icons-png.flaticon.com/128/8542/8542722.png",
//         title:"Recortes",
//         category: "Criatividade",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//         url:"https://rocketseat.com.br"
//     }
// ]

// configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))

// habilitar uso do req.body

server.use(express.urlencoded({extended: true}))

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

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res. send("Erro no banco de dados!")
        }
       
        const reversedIdeas = [...rows].reverse()

    let lastIdeas = []
    for (let idea of reversedIdeas){
       if (lastIdeas.length <2) {
        lastIdeas.push(idea)
       }
    }

    
    return res.render("index.html", { ideas: lastIdeas })
    })
})

server.get("/ideias", function(req, res) {
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res. send("Erro no banco de dados!")
        }
    const reversedIdeas = [...rows].reverse()
    return res.render("ideias.html", {ideas: reversedIdeas})
    })
})

server.post("/", function(req, res){
    //  Inserir dado na tabela

    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
    `
    const values= [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

    db.run(query, values, function(err) {
        if (err) {
            console.log(err)
            return res. send("Erro no banco de dados!")
        }

        return res.redirect ("/ideias")
    })

    //  Deletar um dado
     db.run(`DELETE FROM ideas WHERE id = ?`, [1], function(err) {
        if (err) return console.log(err)

        console.log("DELETEI", this)
     })

    // Consultar dados na tabela

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) return console.log(err)
        console.log(rows)
    })
})

// liguei meu servidor na porta 3000
server.listen(3000)

