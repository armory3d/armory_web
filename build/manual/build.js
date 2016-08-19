let fs = require('fs-extra');
let glob = require("glob");
let showdown = require('./showdown.js');
let converter = new showdown.Converter();

let footer = fs.readFileSync('../footer.html', 'utf8');
let header_manual = fs.readFileSync('../header_manual.html', 'utf8');
let footer_manual = fs.readFileSync('../footer_manual.html', 'utf8');

let mdToHtml = function(sourcename, targetname, title) {
	let header = fs.readFileSync('../header.html', 'utf8').replace('ID_TITLE', title);
	let data = fs.readFileSync(sourcename + '.md', 'utf8');
	let html = converter.makeHtml(data).replace(/.md"/g, '.html"');
	fs.writeFileSync(targetname + '.html', header + header_manual + html + footer_manual + footer);
}

fs.removeSync('../../manual');
fs.copySync('../../../armory_docs', '../../manual');

glob("../../manual/**/*.md", null, function (er, files) {
	for (let i = 0; i < files.length; i++) {
		let file = files[i];
		let basename = file.substr(0, file.lastIndexOf('.')) || file;
		let targetname = basename;
		if (targetname === '../../manual/readme') targetname = '../../manual/index';
		mdToHtml(basename, targetname, 'Manual');
	}
});
