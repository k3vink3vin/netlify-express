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

router.get('/jwks', async (req, res) => {
  console.log("New jwks requested");
  res.send(
    {"keys":[{"kid":"91EF71DEB24845AB35C172B532324CA822C1EFC0","kty":"EC","x5c":["MIIBdDCCASagAwIBAgIUWXXi6D7zeRaGdldhUgAGxAmBNAowBQYDK2VwMCExHzAdBgNVBAMMFmRpZ2ltYXJjLmNvbTpkc2luOnJvb3QwHhcNMjIwNTIzMjEyNDQ1WhcNMjUwOTA0MjEyNDQ1WjAuMSwwKgYDVQQDDCNkaWdpbWFyYy5jb206ZHNpbjppbnRlcm1lZGlhdGUtMjAyMjAqMAUGAytlcAMhANRWq7lTa0UqCRSJN0dSfO4m10SfllV0Ns6rhtTZqInwo2MwYTASBgNVHRMBAf8ECDAGAQH/AgEAMB0GA1UdDgQWBBTcAqwwkxJfIoIyt57qXg2SKU0krDAfBgNVHSMEGDAWgBQ72MFYLq58YD5b0HSMXlShPkH7XTALBgNVHQ8EBAMCAaYwBQYDK2VwA0EAf6/IWxrXHYQsMOuVUQVxTVONwz1n+sbrWYLxfoEq+SCEbiI+hwfydR/aNfSBpSQN+CB13Wbv9oC/wjwGj2stBA==","MIIBCDCBuwIUW+Gy4vfVi5nGaTN5dXyy/cVaT8EwBQYDK2VwMC4xLDAqBgNVBAMMI2RpZ2ltYXJjLmNvbTpkc2luOmludGVybWVkaWF0ZS0yMDIyMB4XDTIzMDYyMjIyMDgxNFoXDTI0MDYyMTIyMDgxNFowIDEeMBwGA1UEAwwVZGlnaW1hcmMuY29tOmRzaW5sZWFmMCowBQYDK2VwAyEApPgyo1bF3fznF4HdPzwjjOvrsTSYH7IPjKC74vvvp7AwBQYDK2VwA0EApj2ek834rtj6m91boo0aPC3c6jj8J68vRVUSLI6E+OjBpAXBcDZNFu3lo8Bvxir+VguhzTvgzWm5y5Typ7whCA=="]}],"SkipUnresolvedJsonWebKeys":true}
  );
});

app.use(cors());
app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
