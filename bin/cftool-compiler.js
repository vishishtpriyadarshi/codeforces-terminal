const program = require('commander');
const compiler = require('../commands/compiler');


program
	.command('set')
	.description('Set new compiler')
	.action(compiler.setCompiler);

program
	.command('show')
	.description('Show added compiler')
	.action(compiler.showCompiler);

program
	.command('remove')
	.description('Remove the added compiler')
	.action(compiler.removeCompiler);

program.parse(process.argv);