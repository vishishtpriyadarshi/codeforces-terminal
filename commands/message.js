const welcome = require('cli-welcome');
const chalk = require('chalk');
const figlet = require('figlet');
const colors = require('colors');
const { version } = require('../package.json');
const unhandledError = require('cli-handle-unhandled');

const display = {
	async showMessage() {
		await unhandledError();
		
		console.log(chalk.blue(
			figlet.textSync('cf-tool', { horizontalLayout: 'full' })
		  ));
		
		welcome({
			title: `cftool`,
			tagLine: `by Vishisht Priyadarshi`,
			bgColor: `#4635AA`,
			color: `#3BD575`,
			bold: true,
			clear: false,
			version
		});
	}
};


module.exports = display;