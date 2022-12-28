const fs = require("fs");

fs.copyFile("_redirects", "dist/_redirects", (err) => {
  if (err) throw err;
  console.log("_redirects was copied ../../dist/_redirects");
});
