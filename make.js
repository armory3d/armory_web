// Import Modules
let PATH = require("path");
    FS = require("fs");
    HTTP = require("http");
    URL = require("url");
    COMPILE_NOTES = true;
    PORT = process.argv[2] || 80,
    WEBPAGES = ["/404", "/notes", "/news", "/features", "/faq", "/marketplace", "/community", "/download", "/privacy"];
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
// Function - Compile Notes
function compileHTML() {
  FS.readdir("templates/", (err, file) => {
    file.forEach(file => {
      if (PATH.extname(file) === ".html") {
        if (PATH.basename(file) !== "navbar.html" && PATH.basename(file) !== "footer.html") {
          let n = FS.readFileSync("templates/navbar.html", "utf8");
          let f = FS.readFileSync("templates/footer.html", "utf8");
          if (PATH.basename(file) !== "notes.html") {
            let m = FS.readFileSync("templates/" + file, "utf8");
            FS.writeFileSync(file, n + "\n" + m + "\n" + f);
          } else if (PATH.basename(file) === "notes.html") {
            if (COMPILE_NOTES === true) {
              let notes = FS.readFileSync("templates/notes.html", "utf8");
              let content1 = FS.readFileSync("templates/changelogs/content.html", "utf8");
              let DATA = FS.readFileSync("templates/changelogs/data.json");
              for (i=1; i<=Object.keys(JSON.parse(DATA)).length; i++) {
                // Get - Changelogs
                let changelog = FS.readFileSync("templates/changelogs/releases/" + JSON.parse(DATA)[i].date + ".html", "utf8");
                // Set - Title (Text)
                let content2 = content1.replace('<span></span>', '<span>' + JSON.parse(DATA)[i].title + '</span>');
                // Set - Title (Image)
                let content3 = content2.replace('src=""', 'src="/img/' + JSON.parse(DATA)[i].image + '"');
                // Set - Anchors + Link (Title + New + Highlights + Bug-Fixes + Other-Changes)
                let content4 = content3.replace('id="title" href="#title"', 'id="' + JSON.parse(DATA)[i].date + '-title"' + ' href="#' + JSON.parse(DATA)[i].date + '-title"');
                let content5 = content4.replace('id="new" href="#new"', 'id="' + JSON.parse(DATA)[i].date + '-new"' + ' href="#' + JSON.parse(DATA)[i].date + '-new"');
                let content6 = content5.replace('id="highlights" href="#highlights"', 'id="' + JSON.parse(DATA)[i].date + '-highlights"' + ' href="#' + JSON.parse(DATA)[i].date + '-highlights"');
                let content7 = content6.replace('id="bug-fixes" href="#bug-fixes"', 'id="' + JSON.parse(DATA)[i].date + '-bug-fixes"' + ' href="#' + JSON.parse(DATA)[i].date + '-bug-fixes"');
                let content8 = content7.replace('id="other-changes" href="#other-changes"', 'id="' + JSON.parse(DATA)[i].date + '-other-changes"' + ' href="#' + JSON.parse(DATA)[i].date + '-other-changes"');
                // Set - Anchors (Download + Manual + Help)
                let content9 = content8.replace('id="download"', 'id="' + JSON.parse(DATA)[i].date + '-download"');
                let content10 = content9.replace('id="manual"', 'id="' + JSON.parse(DATA)[i].date + '-manual"');
                let content11 = content10.replace('id="help"', 'id="' + JSON.parse(DATA)[i].date + '-help"');
                // Set Links - (Download + Manual + Help)
                let content12 = content11.replace('href="#download"', 'href="#' + JSON.parse(DATA)[i].date + '-download"');
                let content13 = content12.replace('href="#manual"', 'href="#' + JSON.parse(DATA)[i].date + '-manual"');
                let content14 = content13.replace('href="#help"', 'href="#' + JSON.parse(DATA)[i].date + '-help"');
                // Set - Changelogs
                let content15 = content14.replace('info_d"></div>', JSON.parse(DATA)[i].date + '-info">' + changelog.split("%INFO - START%").pop().split("%INFO - END%")[0] + '                </div>');
                let content16 = content15.replace('id="highlights_d"></div>', 'id="' + JSON.parse(DATA)[i].date + '-highlights_d">' + changelog.split("%HIGHLIGHTS - START%").pop().split("%HIGHLIGHTS - END%")[0] + '                </div>');
                let content17 = content16.replace('id="new_d"></div>', 'id="' + JSON.parse(DATA)[i].date + '-new_d">' + changelog.split("%NEW - START%").pop().split("%NEW - END%")[0] + '                </div>');
                let content18 = content17.replace('id="bug_fixes_d"></div>', 'id="' + JSON.parse(DATA)[i].date + '-bug_fixes_d">' + changelog.split("%BUG FIXES - START%").pop().split("%BUG FIXES - END%")[0] + '                </div>');
                let content19 = content18.replace('id="other_changes_d"></div>', 'id="' + JSON.parse(DATA)[i].date + '-other_changes_d">' + changelog.split("%OTHER CHANGES - START%").pop().split("%OTHER CHANGES - END%")[0] + '                </div>');
                // Write - Content
                notes = notes.replace("%c" + i + "%", content19);
                FS.writeFileSync(file, n + "\n" + notes + "\n" + f);
              }
            }
          }
        }
      }
    });
  });
}
// Compile - Init
compileHTML();
// Compile - On Detected Changes
let fsTimeout;
FS.watch("templates/", {recursive: true}, e => {
  if (!fsTimeout) {
    compileHTML();
    fsTimeout = setTimeout(function() { fsTimeout=null; }, 1000);
  }
});
// Create Server
HTTP.createServer(function(req, res) {
  // Variables
  let URI = URL.parse(req.url).pathname, 
      fileName = PATH.join(process.cwd(), URI);
  // 302 - Redirect Valid URLs
  if (URI === "" || URI === "/") {
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