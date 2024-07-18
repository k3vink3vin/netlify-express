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
    {"keys":[{"kid":"e5850235d365795e5c5197ac2ea0420926a31236","kty":"EC","x5c":["MIIBdDCCASagAwIBAgIUWXXi6D7zeRaGdldhUgAGxAmBNAowBQYDK2VwMCExHzAdBgNVBAMMFmRpZ2ltYXJjLmNvbTpkc2luOnJvb3QwHhcNMjIwNTIzMjEyNDQ1WhcNMjUwOTA0MjEyNDQ1WjAuMSwwKgYDVQQDDCNkaWdpbWFyYy5jb206ZHNpbjppbnRlcm1lZGlhdGUtMjAyMjAqMAUGAytlcAMhANRWq7lTa0UqCRSJN0dSfO4m10SfllV0Ns6rhtTZqInwo2MwYTASBgNVHRMBAf8ECDAGAQH/AgEAMB0GA1UdDgQWBBTcAqwwkxJfIoIyt57qXg2SKU0krDAfBgNVHSMEGDAWgBQ72MFYLq58YD5b0HSMXlShPkH7XTALBgNVHQ8EBAMCAaYwBQYDK2VwA0EAf6/IWxrXHYQsMOuVUQVxTVONwz1n+sbrWYLxfoEq+SCEbiI+hwfydR/aNfSBpSQN+CB13Wbv9oC/wjwGj2stBA==","MIIBUzCCAQWgAwIBAgIUW+Gy4vfVi5nGaTN5dXyy/cVaT8EwBQYDK2VwMC4xLDAqBgNVBAMMI2RpZ2ltYXJjLmNvbTpkc2luOmludGVybWVkaWF0ZS0yMDIyMB4XDTI0MDUzMDE1MjQyN1oXDTI1MDUzMDE1MjQyN1owITEfMB0GA1UEAwwWZGlnaW1hcmMuY29tOmRzaW46bGVhZjAqMAUGAytlcAMhANyE4q9DpG95a6bQIt1xVeNWUOSo43ifahh7PelaRwGQo0IwQDAdBgNVHQ4EFgQUk4d06pa4Op3wXYKlbd6rSODrts8wHwYDVR0jBBgwFoAU3AKsMJMSXyKCMree6l4NkilNJKwwBQYDK2VwA0EAR00ZQPXksefxp/G76s4OhCvwvQ20f5qbTIubMGVv2BTWdOZNI76lZzbahyhzAvIMR30wBMoYS+WiUrKbAVwpBA=="]},{"kid":"266fdcca7a2110a24fbc527a0a98850d112fe6bd","kty":"EC","x5c":["MIIBdDCCASagAwIBAgIUWXXi6D7zeRaGdldhUgAGxAmBNAowBQYDK2VwMCExHzAdBgNVBAMMFmRpZ2ltYXJjLmNvbTpkc2luOnJvb3QwHhcNMjIwNTIzMjEyNDQ1WhcNMjUwOTA0MjEyNDQ1WjAuMSwwKgYDVQQDDCNkaWdpbWFyYy5jb206ZHNpbjppbnRlcm1lZGlhdGUtMjAyMjAqMAUGAytlcAMhANRWq7lTa0UqCRSJN0dSfO4m10SfllV0Ns6rhtTZqInwo2MwYTASBgNVHRMBAf8ECDAGAQH/AgEAMB0GA1UdDgQWBBTcAqwwkxJfIoIyt57qXg2SKU0krDAfBgNVHSMEGDAWgBQ72MFYLq58YD5b0HSMXlShPkH7XTALBgNVHQ8EBAMCAaYwBQYDK2VwA0EAf6/IWxrXHYQsMOuVUQVxTVONwz1n+sbrWYLxfoEq+SCEbiI+hwfydR/aNfSBpSQN+CB13Wbv9oC/wjwGj2stBA==","MIIBUzCCAQWgAwIBAgIUW+Gy4vfVi5nGaTN5dXyy/cVaT8EwBQYDK2VwMC4xLDAqBgNVBAMMI2RpZ2ltYXJjLmNvbTpkc2luOmludGVybWVkaWF0ZS0yMDIyMB4XDTI0MDUzMDE1MjMyNFoXDTI1MDUzMDE1MjMyNFowITEfMB0GA1UEAwwWZGlnaW1hcmMuY29tOmRzaW46bGVhZjAqMAUGAytlcAMhAHQQkHBQTyAWDN+nQLvIQFdMSEX95/pPEKf96jl6Y6m0o0IwQDAdBgNVHQ4EFgQU7li7Peo6HqF9NfATjuHrAQv/h18wHwYDVR0jBBgwFoAU3AKsMJMSXyKCMree6l4NkilNJKwwBQYDK2VwA0EAtUUw4zxdC3gPrNfXPJt9Mot6rN4yl4d3DffhW5Dj8T0CYs9BtTfi+TOMvP60djS4ZO/sn5E5rVjGIE9dV7wbCA=="]}],"SkipUnresolvedJsonWebKeys":true}
  );
});

app.use(cors());
app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
