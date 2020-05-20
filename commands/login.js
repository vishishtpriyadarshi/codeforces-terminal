const request = require('request');
const cheerio = require('cheerio');

const login = {
	
	checkLoginStatus(){
		return new Promise( (resolve, reject) => {
			request('https://codeforces.com/enter', (error, response, html) => {
				if(error){	// || response.statusCode == 200) => HANDLE THIS ISSUE
					reject(error);
				}
				else{
					const $ = cheerio.load(html);
					const enterPage = $('.lang-chooser a');

					resolve(enterPage.eq(2).html());
				}
			})
		})
	}
};

module.exports = login;