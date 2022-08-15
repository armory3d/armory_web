let fs = require("fs");
let writeHTML = function(fileName) {
	let header = fs.readFileSync("header.html", "utf8");
	let footer = fs.readFileSync("footer.html", "utf8");
	let html = fs.readFileSync(fileName, "utf8");
	fs.writeFileSync("../" + fileName, header + "\n" + html + "\n" + footer);
};
writeHTML("index.html");