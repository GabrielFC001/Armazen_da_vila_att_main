const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");



const db = new sqlite3.Database("itens.sqlite");

const app = express();  

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")))


app.get("/", (req,res) =>{
    res.sendFile(path.join(__dirname + "/cadastro_itens.html"))
})

app.post("/addproduto", function (req, res){

    console.log(req.body);

    var nome = req.body.nome;
    var preco = req.body.preco;
    var codigo = req.body.codigo;
    var marca = req.body.marca;
    var quantidade = req.body.quantidade;
    var categoria = req.body.categoria;
    var peso = req.body.peso;

    var sql = "INSERT INTO PRODUTOS ( NOME, PRECO, CODIGO, MARCA, QUANTIDADE, CATEGORIA, PESO ) VALUES ( ?, ?, ?, ?, ?, ?, ? )";

    db.run(sql, [nome, preco, codigo, marca, quantidade, categoria, peso], (err) => {
        if(err) res.send(err);
        else res.send("Dados Inseridos");
    });
});

app.get("/consulta", (req, res) => {

    var sql = "SELECT * FROM PRODUTOS";
    
    db.all(sql, (err, row) => {
        if(err) res.send(err);
        else res.json(rows);
    });
});


function cria_tabela_de_itens() {
    var query = "CREATE TABLE IF NOT EXISTS PRODUTOS (";
    query += "ID INTEGER PRIMARY KEY AUTOINCREMENT,";
    query += "NOME VARCHAR,";
    query += "PRECO REAL,";
    query += "CODIGO VARCHAR,";
    query += "MARCA VARCHAR,";
    query += "QUANTIDADE VARCHAR,";
    query += "CATEGORIA VARCHAR,";
    query += "PESO REAL )";

    db.run(query, (err) => {
        if (err) console.log(err);
        else console.log("Tabela criada")
    });
}


app.listen(4000, console.log("Correndo..."))