const program = require('commander');
const login = require('../commands/login');
const chalk = require('chalk');
const ora = require('ora');

const spinner1 = ora({ spinner: 'growVertical' });
const spinner2 = ora({ spinner: 'growVertical' });
program
	.action(async function (){

		try{
			spinner1.text = 'Checking Login status...';
			spinner1.start();
			const currentHandle = await login.checkLoginStatus();
			if(currentHandle != 'Enter')
				{
					spinner1.succeed();
					console.log(chalk.yellow('[*]', currentHandle, ' has already logged in !'));
				}
				
			else
				{
					spinner1.succeed();
					spinner2.text = 'Logging in...';
					spinner2.start();
					const CSRF_token = await login.getCSRFToken();
					await login.loggingIn(CSRF_token);
					spinner2.succeed();
					console.log(chalk.green('[+] Successfully logged in ! '));
				}
				
			//console.log(currentHandle);
		}
		catch(err){
			spinner2.fail();	// Logging in failed
			console.log(err);
		}
	});

program.parse(process.argv);