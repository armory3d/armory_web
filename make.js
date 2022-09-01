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
          let f = FS.readFileSync("templates/footer.html", "utf8");
          if (PATH.basename(file) !== "notes.html") {
            let m = FS.readFileSync("templates/" + file, "utf8");
            FS.writeFileSync(file, n + "\n" + m + "\n" + f);
          } else if (PATH.basename(file) === "notes.html") {
            let notes = FS.readFileSync("templates/notes.html", "utf8");
            let content1 = FS.readFileSync("templates/changelogs/content.html", "utf8");
            let DATA = FS.readFileSync("templates/changelogs/data.json");
            let f = FS.readFileSync("templates/footer.html", "utf8");
            for (i=1; i<=Object.keys(JSON.parse(DATA)).length; i++) {
              let changelog = FS.readFileSync("templates/changelogs/releases/" + JSON.parse(DATA)[i].date + ".html", "utf8");
              let content2 = content1.replace('<span></span>', '<span>' + JSON.parse(DATA)[i].title + '</span>');
              let content3 = content2.replace('src=""', 'src="/img/' + JSON.parse(DATA)[i].image + '"');
              let content4 = content3.replace('id="info_d"></div>', 'id="info_d">' + changelog.split("%INFO - START%").pop().split("%INFO - END%")[0] + '</div>');
              let content5 = content4.replace('id="highlights_p"></p>', 'id="highlights_p">' + changelog.split("%HIGHLIGHTS - START%").pop().split("%HIGHLIGHTS - END%")[0] + '</p>');
              let content6 = content5.replace('id="new_p"></p>', 'id="new_p">' + changelog.split("%NEW - START%").pop().split("%NEW - END%")[0] + '</p>');
              let content7 = content6.replace('id="bug_fixes_p"></p>', 'id="bug_fixes_p">' + changelog.split("%BUG FIXES - START%").pop().split("%BUG FIXES - END%")[0] + '</p>');
              let content8 = content7.replace('id="other_changes_p"></p>', 'id="other_changes_p">' + changelog.split("%OTHER CHANGES - START%").pop().split("%OTHER CHANGES - END%")[0] + '</p>');
              notes = notes.replace("%c" + i + "%", content8);
              FS.writeFileSync(file, n + "\n" + notes + "\n" + f);
            }
          }
        }
      }
    });
  });
};
// Init Build
buildHTML();
// Re-build On Changes
FS.watch("templates/", {recursive: true}, e => {
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