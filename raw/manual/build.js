var fs = require('fs');
var showdown = require('./showdown.js');
var converter = new showdown.Converter();

var writeFile = function(source, target, title) {
	fs.readFile('../header.html', 'utf8', function(err, data) {
		var header = data;
		header = header.replace('ID_TITLE', title);

		fs.readFile('../footer.html', 'utf8', function(err, data) {
			var footer = data;
		fs.readFile('../header_manual.html', 'utf8', function(err, data) {
			var header_manual = data;
		fs.readFile('../footer_manual.html', 'utf8', function(err, data) {
			var footer_manual = data;


			fs.readFile('../../../armory_docs/' + source, 'utf8', function(err, data) {
				var html = converter.makeHtml(data);

				fs.writeFile('../../manual/' + target, header + header_manual + html + footer_manual + footer, function(err) {
				    if(err) return console.log(err);
				}); 
			});


		});});});
	});
}

writeFile('readme.md', 'manual.html', 'Armory');
