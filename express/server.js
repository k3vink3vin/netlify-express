'use strict';
const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');

const app = express();
const router = express.Router();

router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});

router.get('/foo', async (req, res) => {
  console.log("New foo requested");
  res.send({foo: 'bar'});
});

app.use(cors());
app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));
app.use('/api/v2/jwks', (req, res) => res.sendFile(path.join(__dirname, '../jwks.json')));

module.exports = app;
module.exports.handler = serverless(app);
