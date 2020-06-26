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
	
	getPassword() {
		return this.conf.get('password');	
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
	
	
	setCompiler(compilerOption) {
        this.conf.set('compiler', compilerOption);
    };

	
    getCompiler() {
        if (!this.conf.get('compiler')) {
			throw new Error (chalk.red('No compiler found - set a compiler for the user'));                     
        }
        return this.conf.get('compiler');
    };
	
	removeCompiler() {
		const compiler = this.getCompiler();
		this.conf.delete('compiler');
	}
}

module.exports = CfuserManager;