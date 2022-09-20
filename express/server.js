'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const scp = require('./scp.js');

const router = express.Router();
router.get('/', async (req, res) => {
  let url = "https://mangakita.net/manga/one-piece/";
  let hsl = await scp.minta_semua(url);
  res.json(hsl);
});
router.get('/:link', async (req, res) => {
  let url = "https://mangakita.net/" + req.params.link;
  let hsl = await scp.minta_gambar(url);
  res.json(hsl);
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
