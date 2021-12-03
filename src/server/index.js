const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const CLIENT_BUILD_PATH = path.join(__dirname, '../../build');
const PUBLIC_PATH = path.join(__dirname, '../../public');
const API_PROXY = 'http://localhost:3001';

const app = express();
const port = 3000;

app.use(express.static(CLIENT_BUILD_PATH));
app.use(express.static(PUBLIC_PATH));

app.use('/', (req, res, next) => {
  console.log(req.url)
  next();
});

app.use('/api', createProxyMiddleware({ target: API_PROXY, changeOrigin: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
