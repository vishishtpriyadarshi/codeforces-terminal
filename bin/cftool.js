#!/usr/bin/env node

const program = require('commander');
const { version } = require('../package.json');
const chalk = require('chalk');
const figlet = require('figlet');


program
	.version(version)
	.command('cfuser', 'Setting up details of the user')
	.command('login', 'Logging into the Codeforces Platform')
	.command('logout', 'Logout from CF').command('logout', 'Logout from CF')
	.parse(process.argv);

