const express = require('express');
const serverless = require("serverless-http");
const scp = require('./scp.js');

const app = express();
const router = express.Router();

router.get('/', async function(req, res){
    let url = "https://mangakita.net/manga/one-piece/";
    console.log(url);
    let hsl = await scp.minta_semua(url);
    res.json(hsl);
});

router.get('/:link', async function(req, res){
    url = "https://mangakita.net/" + req.params.link;
    let hsl = await scp.minta_gambar(url);
    res.json(hsl);
});

module.exports = app;
module.exports.handler = serverless(app);