let fs = require('fs');
let header = fs.readFileSync('header.html', 'utf8');
let cover = fs.readFileSync('cover.html', 'utf8');
let footer = fs.readFileSync('footer.html', 'utf8');

let writeHtml = function(fileName, extra = '') {
	let html = fs.readFileSync(fileName, 'utf8');
	fs.writeFileSync('../' + fileName, header + cover + html + extra + footer);
}

let writeNews = function(fileName, extra = '') {
	let html = fs.readFileSync('../../armorpaint_web/src/' + fileName, 'utf8');
	html = html.replaceAll('img/news/', 'https://armorpaint.org/img/news/');
	fs.writeFileSync('../' + fileName, header + cover + html + extra + footer);
}

let writeManual = function(fileNameOut, fileNameHeader, fileNameFooter, fileNameMd) {
	let showdown = require('./showdown.min.js');
    let converter = new showdown.Converter();
    let file_md = fs.readFileSync(fileNameMd, 'utf8');
    let converted_md = converter.makeHtml(file_md);
	let htmlHeader = fs.readFileSync(fileNameHeader, 'utf8');
	let htmlFooter = fs.readFileSync(fileNameFooter, 'utf8');
	fs.writeFileSync('../' + fileNameOut, header + htmlHeader + converted_md + htmlFooter + footer);
}

writeHtml('index.html');
writeNews('news.html');
writeHtml('community.html');
writeHtml('download.html');
writeHtml('notes.html');
writeHtml('howto.html');
writeHtml('privacy.html');
writeManual('manual.html', 'manual_header.html', 'manual_footer.html', '../manual.md');
