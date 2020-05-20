const request = require('request');
const cheerio = require('cheerio');

request('https://codeforces.com/enter', (error, response, html) => {
	if(!error && response.statusCode == 200) {
		
		const $ = cheerio.load(html);
		const enterPage = $('.lang-chooser a');
		
		console.log(enterPage.eq(2).html());
	}
});
