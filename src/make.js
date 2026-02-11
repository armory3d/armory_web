let fs = require('fs');
let header = fs.readFileSync('header.html', 'utf8');
let cover = fs.readFileSync('cover.html', 'utf8');
let footer = fs.readFileSync('footer.html', 'utf8');

let write_html = function(fileName, extra = '') {
	let html = fs.readFileSync(fileName, 'utf8');
	fs.writeFileSync('../' + fileName, header + cover + html + extra + footer);
}

write_html('index.html');
write_html('privacy.html');
write_html('login.html');
write_html('account.html');
