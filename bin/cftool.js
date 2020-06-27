#!/usr/bin/env node

const program = require('commander');
const { version } = require('../package.json');
const chalk = require('chalk');
const figlet = require('figlet');

const message = require('../commands/message');

message.showMessage();

program
	.version(version)
	.command('cfuser', 'Setting up details of the user')
	.command('login', 'Log into the Codeforces Platform')
	.command('logout', 'Log out from the Codeforces Platform')
	.command('compiler', 'Manage compiler options')
	.command('submit', 'Submit solution')
	.command('rating', 'Show Rating Graph of the specified user')
	.parse(process.argv);

