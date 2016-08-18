var fs = require('fs');

var writeHtml = function(fileName, title) {
	var header = fs.readFileSync('header.html', 'utf8').replace('ID_TITLE', title);
	var footer = fs.readFileSync('footer.html', 'utf8');
	var html = fs.readFileSync(fileName, 'utf8');
	fs.writeFileSync('../' + fileName, header + html + footer);
}

writeHtml('index.html', 'Armory');
writeHtml('news.html', 'News');
writeHtml('gallery.html', 'Gallery');
writeHtml('buy.html', 'Buy');
