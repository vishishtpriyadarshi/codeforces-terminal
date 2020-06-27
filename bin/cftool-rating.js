const program = require('commander');
const rating = require('../commands/rating');

program
	.command('solo')
	.description('Show rating of a single user')
	.option(
		'--handle <type>',
		'Add User Handle'
	)
	.action((arg) => rating.display(arg));

program
	.command('compare')
	.description('Compare rating graph of 2 users')
	.option(
		'--handle1 <type>',
		'Handle of user 1'
	)
	.option(
			'--handle2 <type>',
			'Handle of user 2'
		)
	.action((arg) => rating.compare(arg));

	
program.parse(process.argv);