const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 5000;
const server = http.createServer((req, res) => {
    console.log(req)
  let filePath = "./public" + req.url;

  if (req.url === "/") {
    filePath = "./public/index.html";
  }

  const ext = path.extname(filePath);

  const contentTypes = {
    ".html": "text/html"
  };
  const contentType = contentTypes[ext] || "text/plain";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 - File Not Found");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    }
  });
});




server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
