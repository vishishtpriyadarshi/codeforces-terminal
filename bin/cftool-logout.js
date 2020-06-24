const program = require('commander');
const chalk = require('chalk')
const ora = require('ora');

const login = require('../commands/login');
const logout = require('../commands/logout');

const spinner1 = ora({ spinner: 'growVertical' });
const spinner2 = ora({ spinner: 'growVertical' });

program.action(async function () {
    try {
		spinner1.text = 'Checking current user...';
		spinner1.start();
        const currentUser = await login.checkLoginStatus();
        if (currentUser === 'Enter') {
			spinner1.succeed();
            console.log(chalk.yellow('[*] No user logged-in !'));
            return;
        }
		
		spinner1.succeed();
		spinner2.text = 'Logging out...';
    	spinner2.start();
        await logout.eraseCookies();
        console.log(chalk.green('[+]', currentUser, ' has successfully logged out !'));
		spinner2.succeed();
    
	} catch (error) {
        console.log(chalk.red().bold('[-] Error occurred while logging out! Log out again.'))
        console.log(error);
    }
	
});

program.parse(process.argv);