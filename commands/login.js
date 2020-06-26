const request = require('request');
const cheerio = require('cheerio');
const toughcookie = require('tough-cookie-filestore');

const headerObject = require('../lib/headerObject');
const CfuserManager = require('../lib/CfuserManager');
const {cookiePath} = require('../lib/cookiePath');


const login = {
	
	checkLoginStatus(){
		
		return new Promise( (resolve, reject) => {
			const requestDetails = {
				url: 'https://codeforces.com/enter',
				headers: headerObject(),
				jar: request.jar(new toughcookie(cookiePath)),
				timeout: 30000
			}
			
			request.get(requestDetails, (error, response, body) => {
                if (error)
					return reject(error);
				
                const $ = cheerio.load(body);
                const currentUser = $('.lang-chooser a').eq(2).text();
                
				resolve(currentUser);
            });
		})
	},
	
	getCSRFToken(){
		return new Promise( (resolve, reject) => {
			
			const requestDetails = {
                url: 'https://codeforces.com/enter',
                headers: headerObject(),
                jar: request.jar(new toughcookie(cookiePath)),
                timeout: 30000
            }
			
            request.get(requestDetails, (error, response, body) => {
				
                if (error)
					return reject(error);
				
                const $ = cheerio.load(body);
                const CSRF_token = $('input').attr('value');
				
               	if ( CSRF_token === undefined)
			 		return reject(new Error('CSRF Token retrieval failed !'));

				if( CSRF_token.length < 20 )
					return reject(new Error('Invalid CSRF Token !'));
					
			 	resolve(CSRF_token);
            });
		})
	},
	
	loggingIn(CSRF_token) {
		 return new Promise( (resolve, reject) => {

            // Get credentials form CredentialManager
            const userDetails = new CfuserManager();
            let handle, password;
            try {
                handle = userDetails.getUser();
                password = userDetails.getPassword();
            } catch (e) {
                return reject(new Error('Set up user details first!'));
            }
			 
			const headerDetails = {
                origin : 'https://codeforces.com',
                referer : 'https://codeforces.com/enter?back=%2F'
            }
			const headers = headerObject(headerDetails);
			const jar = request.jar(new toughcookie(cookiePath));
			
            // Create Form
            const form = {
                handleOrEmail: handle,
                password,
                csrf_token: CSRF_token,
                action: 'enter'
            };
		
			// Post request details
            const requestDetails = {
                url: 'https://codeforces.com/enter',
                headers,
				jar,
                form,
                timeout: 30000
            }

            // Post request
            request.post(requestDetails, (error, response, body) => {
				
				//console.log( response.statusCode );
                if ( error )
					return reject(e);
				if ( response.statusCode != 302 )
					return reject('Failed to login... Check your handle and password!');
                
				// TO DO: Handle the case when the CF is down
				
				resolve();
            });
        })
    }

};

module.exports = login;