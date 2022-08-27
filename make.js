// Import modules
let HTTP = require("http");
    URL = require("url"),
    PATH = require("path"),
    FS = require("fs")
// Build Function
let buildHTML = function() {
  FS.readdir("templates/", (err, file) => {
    file.forEach(file => {
      if (PATH.extname(file) == ".html") {
        if (PATH.basename(file) !== "navbar.html" && PATH.basename(file) !== "footer.html") {
          let n = FS.readFileSync("templates/navbar.html", "utf8");
          let m = FS.readFileSync("templates/" + file, "utf8");
          let f = FS.readFileSync("templates/footer.html", "utf8");
          FS.writeFileSync(file, n + "\n" + m + "\n" + f);
        }
      }
    });
  });
};
// Init Build
buildHTML();
// Re-build On Changes
FS.watch("templates/", e => {
  buildHTML();
});
// Server Variables
let PORT = process.argv[2] || 80,
WEBPAGES = ["/notes", "/news", "/features", "/faq", "/community", "/download"]
MIME_TYPES = {
  "html": "text/html",
  "css": "text/css",
  "js": "text/javascript",
  "ico": "image/vnd.microsoft.icon",
  "svg": "image/svg+xml",
  "png": "image/png",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "gif": "image/gif",
  "webp": "image/webp",
  "mp4": "video/mp4",
  "webm": "video/webm",
  "json": "application/json"
};
// Create Server
HTTP.createServer(function(req, res) {
  // Variables
  let URI = URL.parse(req.url).pathname, 
      fileName = PATH.join(process.cwd(), URI);
  // 302 - Redirect Valid URLs
  if (URI == "" || URI == "/") {
    fileName = "index.html";
  } else if (WEBPAGES.includes(URI)) {
    fileName += ".html";
  }
  FS.exists(fileName, function(exists) {
    // Get Extension Types
    let mimeType = MIME_TYPES[fileName.split(".").pop()];
    if (!mimeType) {
      mimeType = "text/plain";
    }
    if (exists) {
      // 200 - OK success
      res.writeHead(200, { "Content-Type": mimeType });
      FS.readFile(fileName, function (err, data) {
        res.end(data);
      });
    } else {
      // 404 - Page Not Found
      fileName = "404.html";
      res.writeHead(404, { "Content-Type": "text/html" });
      FS.readFile(fileName, function (err, data) {
        res.end(data);
      });
    }
  });
}).listen(parseInt(PORT, 10));
console.log("Server started on PORT: [" + PORT + "]");