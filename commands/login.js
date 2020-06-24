const request = require('request');
const cheerio = require('cheerio');
const toughcookie = require('tough-cookie-filestore');

const headerObject = require('../lib/headerObject');
const CfuserManager = require('../lib/CfuserManager');
const path = require('path');


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
	},
	
	getCSRFToken(){
		return new Promise( (resolve, reject) => {
			request('https://codeforces.com/enter', (error, response, html) => {
				if(error){	// || response.statusCode == 200) => HANDLE THIS ISSUE
					reject(error);
				}
				else{
					const $ = cheerio.load(html);
                	const CSRF_token = $('input').attr('value');
					
                	if ( CSRF_token === undefined)
                    	return reject(new Error('CSRF Token retrieval failed !'));
					
					if( CSRF_token.length < 20 )
						return reject(new Error('Invalid CSRF Token !'));
					
                	resolve(CSRF_token);
				}
			})
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
			 
			// *********** ISSUE *****************
			// Need to create a cookie.json file
			 
			 
			//Seeting up cookies path and cookie jar
			 
			//const config_directory = path.join(process.env.HOME, './workspace');  // Doubt in '.cftool'
			//const cookiePath = path.join(config_directory, './codeforces-cli/cookie.json');
            const jar = request.jar(new toughcookie('./cookie.json'));
			
			const headerDetails = {
                origin : 'https://codeforces.com',
                referer : 'https://codeforces.com/enter?back=%2F'
            }
			const headers = headerObject(headerDetails);
			 
			 
			 
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
				console.log(handle);
				//console.log(password);
				console.log(CSRF_token);
				console.log(body);
                if (error)
					return reject(e);
                if ( response.statusCode != 200 )
					return reject('Failed to login');
                
				resolve();
				//console.log(body);
            });
        })
    }

};

module.exports = login;