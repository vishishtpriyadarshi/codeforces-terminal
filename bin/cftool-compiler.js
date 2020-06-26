const program = require('commander');
//const compiler = require('../commands/compiler');


program
	.command('set')
	.description('Set new compiler')
	.action(() => console.log('Set compiler'));

program
	.command('show')
	.description('Show added compiler')
	.action(() => console.log('Show compiler'));

program
	.command('remove')
	.description('Remove the added compiler')
	.action(() => console.log('Remove compiler'));

program.parse(process.argv);