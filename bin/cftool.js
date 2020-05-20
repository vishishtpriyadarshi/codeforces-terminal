#!/usr/bin/env node

const program = require('commander');
const { version } = require('../package.json');

program
	.version(version)
	.command('cfuser', 'Setting up details of the user')
	.parse(process.argv);

console.log("cf-tool is up");