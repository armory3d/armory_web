var fs = require('fs');

var writeFile = function(fileName, title) {
	fs.readFile('header.html', 'utf8', function(err, data) {
		var header = data;
		header = header.replace('ID_TITLE', title);

		fs.readFile('footer.html', 'utf8', function(err, data) {
			var footer = data;

			fs.readFile(fileName, 'utf8', function(err, data) {
				var html = data;

				fs.writeFile('../' + fileName, header + html + footer, function(err) {
				    if(err) return console.log(err);
				}); 
			});
		});
	});
}

writeFile('index.html', 'Armory');
writeFile('news.html', 'News');
writeFile('gallery.html', 'Gallery');
writeFile('buy.html', 'Buy');
