var fs = require('fs-extra');
var glob = require("glob");
var showdown = require('./showdown.js');
var converter = new showdown.Converter();

var footer = fs.readFileSync('../footer.html', 'utf8');
var header_manual = fs.readFileSync('../header_manual.html', 'utf8');
var footer_manual = fs.readFileSync('../footer_manual.html', 'utf8');

var mdToHtml = function(basename, title) {
	var header = fs.readFileSync('../header.html', 'utf8').replace('ID_TITLE', title);
	var data = fs.readFileSync(basename + '.md', 'utf8');
	var html = converter.makeHtml(data).replace(/.md"/g, '.html"');
	fs.writeFileSync(basename + '.html', header + header_manual + html + footer_manual + footer);
}

fs.removeSync('../../manual');
fs.copySync('../../../armory_docs', '../../manual');

glob("../../manual/**/*.md", null, function (er, files) {
	for (var i = 0; i < files.length; i++) {
		var file = files[i];
		var basename = file.substr(0, file.lastIndexOf('.')) || file;
		mdToHtml(basename, 'Manual');
	}
});
