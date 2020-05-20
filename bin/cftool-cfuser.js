const program = require('commander');

program
	.command('set')
	.description('Adding the details of the user')
	.action(() => console.log('set command executed'));

program.parse(process.argv);