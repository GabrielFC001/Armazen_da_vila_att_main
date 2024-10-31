const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");



const db = new sqlite3.Database("Usuarios.sqlite");

const app = express();  


app.use(express.static(path.join(__dirname, "public")))


app.get("/", (req,res) =>{
    res.sendFile(path.join(__dirname + "/cadastro.html"))
})


app.get("/criartabela", (req, res) => {

    var sql = 'CREATE TABLE CADASTROS (ID INTEGER PRIMARY KEY AUTOINCREMENT, NOME VARCHAR, EMAIL VARCHAR, SENHA VARCHAR, CPF VARCHAR, NUMERO VARCHAR, CEP VARCHAR);'

    db.run(sql, err =>{
        if(err) res.send("err")
        else res.send("tabela criada com sucesso!")
    })

});

app.get("/inserir", (req, res) => {


    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    var cpf = req.body.cpf;
    var numero = req.body.numero;
    var cep = req.body.cep;
    

    var sql = 'INSERT INTO CADASTROS (NOME, EMAIL, SENHA, CPF, NUMERO, CEP) VALUES ( ?, ?, ?, ?, ?, ? );';

    db.run(sql, [nome, email, senha, cpf, numero, cep], (err) => {
        if(err) res.send(err);
        else res.send("cadastro feito com sucesso!");
    })
} )
 
app.listen(3000, console.log("rodando..."));



