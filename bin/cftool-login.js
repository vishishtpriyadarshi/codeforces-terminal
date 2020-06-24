const program = require('commander');
const login = require('../commands/login');
const chalk = require('chalk');

program
	.action(async function (){
		console.log('Trying to login....Please Wait');

		try{
			const currentHandle = await login.checkLoginStatus();
			if(currentHandle != 'Enter')
				console.log(currentHandle, ' logged in !!!');
			else
				{
					// console.log('Unable to login');
					const CSRF_token = await login.getCSRFToken();
					await login.loggingIn(CSRF_token);
					const currentHandle2 = await login.checkLoginStatus();
					console.log('Successfully logged in as ', currentHandle2);
				}
				
			//console.log(currentHandle);
		}
		catch(err){
			console.log(err);
		}
	});

program.parse(process.argv);