const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("./dist"));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.listen(PORT, (error) => {
  if (error) console.error(error);
  console.log(`Server listening on port ${PORT}`);
});
