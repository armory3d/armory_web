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
write_html('server.html');
write_html('news.html');
write_html('blog.html');

// rss.xml
{
	let rss = `<?xml version="1.0" encoding="UTF-8" ?>
	<rss version="2.0">
	<channel>
		<title>Armory3D</title>
		<link>https://armory3d.org/news</link>
		<description>3D Content Creation Tools</description>
	`;

	let news = fs.readFileSync("news.html", "utf8");
	let h3s = news.split(`<h3 class="fw-normal text-muted mb-3">`);
	let items = [];
	h3s.shift();
	h3s.shift();
	for (let h3 of h3s) {
		items.push(h3.split("</h3>")[0]);
	}

	for (let item of items) {
		rss += `
			<item>
	    		<title>Armory3D News</title>
	    		<link>https://armory3d.org/news</link>
	    		<description>${item}</description>
			</item>

		`;
	}

	rss += `
	</channel>
	</rss>
	`;

	fs.writeFileSync('../rss.xml', rss);
}

// rss_blog.xml
{
	let rss = `<?xml version="1.0" encoding="UTF-8" ?>
	<rss version="2.0">
	<channel>
		<title>Armory3D Blog</title>
		<link>https://armory3d.org/blog</link>
		<description>3D Content Creation Tools</description>
	`;

	let news = fs.readFileSync("blog.html", "utf8");
	let h3s = news.split(`<h3 class="fw-normal text-muted mb-3">`);
	let items = [];
	h3s.shift();
	h3s.shift();
	for (let h3 of h3s) {
		items.push(h3.split("</h3>")[0]);
	}

	for (let item of items) {
		rss += `
			<item>
	    		<title>Armory3D Blog</title>
	    		<link>https://armory3d.org/blog</link>
	    		<description>${item}</description>
			</item>

		`;
	}

	rss += `
	</channel>
	</rss>
	`;

	fs.writeFileSync('../rss_blog.xml', rss);
}
