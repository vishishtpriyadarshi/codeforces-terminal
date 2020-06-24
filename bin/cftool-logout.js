const program = require('commander');
const chalk = require('chalk')

const login = require('../commands/login');
const logout = require('../commands/logout');

program.action(async function () {
    try {
        const currentUser = await login.checkLoginStatus();
        if (currentUser === 'Enter') {
            console.log(chalk.blue('[*] No user logged-in !'));
            return;
        }
		
        await logout.eraseCookies();
        console.log(chalk.green('[+]', currentUser, ' has successfully logged out !'));
    
	} catch (error) {
        console.log(chalk.red().bold('[-] Error Encountered !'))
        console.log(error);
    }
	
});

program.parse(process.argv);