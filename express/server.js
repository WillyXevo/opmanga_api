'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const scp = require('./scp.js');

// Link to views folder.
let views = path.join(__dirname, '../');

// Home route.
router.get('/', (req, res) => {
  res.sendFile('index.html', { root: views });
});

// Other routes.
router.get('/page1', function(req, res){
  res.sendFile('page1.html', { root: views });
});
router.get('/page2', function(req, res){
  res.sendFile('page2.html', { root: views });
});
router.get('/page3', function(req, res){
  res.sendFile('page3.html', { root: views });
});
router.get('/page4', function(req, res){
  res.sendFile('page4.html', { root: views });
});

router.get('/api', async (req, res) => {
  let url = "https://mangakita.net/manga/one-piece/";
  let hsl = await scp.minta_semua(url);
  res.json(hsl);
});

router.get('/api/:link', async (req, res) => {
  let url = "https://mangakita.net/" + req.params.link;
  let hsl = await scp.minta_gambar(url);
  res.json(hsl);
});


app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda (express/server.js)
//app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
