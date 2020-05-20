const Configstore = require('configstore');
const pkg = require('../package.json');
const chalk = require('chalk');

class CfuserManager{
	constructor(){
		this.conf = new Configstore(pkg.name);
	}
	
	setUser(handle, password){
		this.conf.set('handle', handle);
		this.conf.set('password', password);
		return handle;
	}
	
	getUser(){
		const handle = this.conf.get('handle');
		
		if(!handle)
			throw new Error (chalk.red.bold('No handle found - set a handle for user'));
		
		return handle;
	}
	
	deleteUser(){
		const handle = this.conf.get('handle');
		const password = this.conf.get('password');
		
		if(!handle)
			throw new Error ('No handle found - set a handle for user');
		
		this.conf.delete('handle');
		this.conf.delete('password');
		
		return;
	}
}

module.exports = CfuserManager;