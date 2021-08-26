let fs = require('fs');

let writeHtml = function(fileName) {
	let header = fs.readFileSync('header.html', 'utf8');
	let footer = fs.readFileSync('footer.html', 'utf8');
	let html = fs.readFileSync(fileName, 'utf8');
	fs.writeFileSync('../' + fileName, header + html + footer);
}

writeHtml('index.html');
writeHtml('news.html');
writeHtml('community.html');
writeHtml('download.html');
writeHtml('fund.html');
writeHtml('notes.html');
