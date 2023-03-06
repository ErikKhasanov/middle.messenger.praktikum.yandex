const express = require('express');
const path = require('path');

const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.static('./dist'));

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

server.listen(PORT, (req, res) => {
  console.log('Start listening on port 3000');
});
