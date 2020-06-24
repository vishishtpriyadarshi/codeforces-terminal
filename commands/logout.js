const request = require('request');
const cheerio = require('cheerio');
const toughcookie = require('tough-cookie-filestore');
const fs = require('fs')

const headerObject = require('../lib/headerObject');
const {cookiePath} = require('../lib/cookiePath');

const logout = {
	
	eraseCookies() {
        return new Promise ((resolve, reject) => {
            try {
                fs.unlinkSync(cookiePath);
                fs.writeFileSync(cookiePath, '');
            } catch(e) {
                return reject(e);
            }
            resolve();
        });
    }

}

module.exports = logout;