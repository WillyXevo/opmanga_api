const express = require('express');
const scp = require('./scp.js');
const app     = express();

app.get('/', async function(req, res){
    let url = "https://mangakita.net/manga/one-piece/";
    console.log(url);
    let hsl = await scp.minta_semua(url);
    res.send(hsl);
});

app.get('/:link', async function(req, res){
    url = "https://mangakita.net/" + req.params.link;
    let hsl = await scp.minta_gambar(url);
    res.send(hsl);
});

app.listen('5000');
console.log('API is running on http://localhost:5000');
module.exports = app;