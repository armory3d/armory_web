/* jshint esversion: 6 */
// Import modules
let HTTP = require("http");
    URL = require("url"),
    PATH = require("path"),
    FS = require("fs")
// Build Function
let buildHTML = function() {
  FS.readdir(".", (err, file) => {
    file.forEach(file => {
      if (PATH.extname(file) == ".html") {
        let n = FS.readFileSync("templates/navbar.html", "utf8");
        let m = FS.readFileSync("templates/" + file, "utf8");
        let f = FS.readFileSync("templates/footer.html", "utf8");
        FS.writeFileSync(file, n + "\n" + m + "\n" + f);
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
// Create Server
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
HTTP.createServer(function(req, res) {
  // Variables
  let URI = URL.parse(req.url).pathname, 
      fileName = PATH.join(process.cwd(), URI);
  // 302 - Redirect URLs
  if (URI == "" || URI == "/") {
    fileName = "index.html";
  } else if (WEBPAGES.includes(URI)) {
    fileName += ".html";
  }
  FS.readFile(fileName, "binary", function(err, file) {
    // 404 - File Not Found
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.write("404 Not Found\n", "binary");
      res.end();
      return;
    } else {
      // Get Extension Types
      let mimeType = MIME_TYPES[fileName.split(".").pop()];
      if (!mimeType) {
        mimeType = "text/plain";
      }
      // Send Data
      res.writeHead(200, { "Content-Type": mimeType });
      res.write(file, "binary");
      res.end();
    }
  });
}).listen(parseInt(PORT, 10));
console.log("Server started on PORT: [" + PORT + "]");