#!/usr/bin/env node

const program = require('commander');
const { version } = require('../package.json');
const chalk = require('chalk');
const figlet = require('figlet');

program
	.version(version)
	.command('cfuser', 'Setting up details of the user')
	.parse(process.argv);

console.log(chalk.blue(
    figlet.textSync('cf-tool', { horizontalLayout: 'full' })
  ));