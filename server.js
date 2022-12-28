const express = require("express");

const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.static("./dist"));
server.get("/:slug", (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

server.listen(PORT, (req, res) => {
  console.log("Start listening on port 3000");
});
