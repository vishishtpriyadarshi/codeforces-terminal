const inquirer = require('inquirer');
const colors = require('colors');
const CfuserManager = require('../lib/CfuserManager');
const { isRequired } = require('../utils/validation');
const chalk = require('chalk');

const cfuser = {
	
	async set(){
		const cfuserManager = new CfuserManager();
		const input = await inquirer.prompt([
			{
				type: 'input',
				name: 'handle',
				message: 'Enter handle:',
				validate: isRequired
			},
			{
                type: 'password',
                name: 'password',
                message: 'Enter Password:',
				validate: isRequired
            }
		]);
		
		const user = cfuserManager.setUser(input.handle, input.password);
		
		if(user)
			console.log(chalk.green.bold('User handle set\nUser password set'));
		
	},
	
	
	
	show(){
		try{
			const cfuserManager = new CfuserManager();
			const handle = cfuserManager.getUser();
			
			console.log('Handle: ', handle.yellow);
			return handle;
		}
		catch (e){
			console.error(e.message.red);
		}
	},
	
	
	
	remove(){
		try{
			const cfuserManager = new CfuserManager();
			cfuserManager.deleteUser();
			
			console.log(chalk.green.bold('User removed successfully !'));
			return;
		}
		catch (e){
			console.error(e.message.red);
		}
	}
};

module.exports = cfuser;