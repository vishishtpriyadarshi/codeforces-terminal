const program = require('commander');
const cfuser = require('../commands/cfuser');

program
	.command('set')
	.description('Adding the details of the user')
	.action(cfuser.set);

program
	.command('show')
	.description('Show the details of the user')
	.action(cfuser.show);

program
	.command('remove')
	.description('Remove the details of the user')
	.action(cfuser.remove);

program.parse(process.argv);