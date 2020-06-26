const program = require('commander');
const request = require('request');
const cheerio = require('cheerio');

const chalk = require('chalk');
const ora = require('ora');

const login = require('../commands/login');
const compiler = require('../commands/compiler');
const submit = require('../commands/submit');
const verdictHelper = require('../commands/submissionStatus');

const spinner1 = ora({ spinner: 'growVertical' });
const spinner2 = ora({ spinner: 'growVertical' });

const CfuserManager = require('../lib/CfuserManager');
const headerObject = require('../lib/headerObject');
const {cookiePath} = require('../lib/cookiePath')
const toughcookie = require('tough-cookie-filestore');

program
	.action(async function () {
		try {
			spinner1.text = 'Checking Login status...';
			spinner1.start();
			
			// Check Login status
			const currentHandle = await login.checkLoginStatus();
			
			if(currentHandle == 'Enter')
			{
				spinner1.fail();
				console.log(chalk.red('[-] Login is required first!'));
				return;
			}
			
			// Already logged in
			spinner1.succeed();
			spinner2.text = 'Checking compiler details...'
			
			const selectedCompiler = compiler.getCompiler();
			
			if(selectedCompiler == undefined)
			{
				spinner2.fail();
				console.log(chalk.red('[-] Compiler not set!'));
				return;
			}
			
			// Compiler already selected
			spinner2.succeed();
			
			let submissionDetails = await submit.getSubmissionDetails();
			await submit.submitCode(submissionDetails);
			
			console.log(chalk.green('[+] Submission successful!'));
			
			
			// Dynamic Verdict Viewer
			const userDetails = new CfuserManager();
			let handle = userDetails.getUser();
			let url = 'https://codeforces.com/submissions/'+handle;
			
			const headers = headerObject();
			
			let $ = await (() => { 
				return new Promise((resolve, reject) => {
					request.get({
						headers,
						url: url,
						jar: request.jar(new toughcookie(cookiePath)),
						timeout: 45000
					}, (err, res, body) => {
						if (err)
							return reject(err)
						
						resolve(cheerio.load(body, { decodeEntities: false }));
					})
				})
			})();

			let submissionId;
			try {
				submissionId = verdictHelper.parseSubmissionID($);
			} catch (error) {
				console.log(error);
				throw new Error('Can not get submission ID!');
			}

			let table = $('.id-cell').parent().children('td');
			let problemLink = table.eq(3).children('a').attr('href');
			let submissionUrl = 'https://codeforces.com' + problemLink.replace(/^\/([^\/]*)\/([^\/]*)\/.*$/, '\/$1\/$2\/submission/' + submissionId);

		
		
		let problemItem = table.eq(3).children('a');
		let problem = '';
		problem += problemItem.attr('href').replace(/\/([^\/]*)\/([^\/]*)\/problem\/([^\/])/, '$1 $2$3 - ');
		problem += problemItem.text().replace(/^\s*(.*)\s*$/, '$1').replace(/^.+\s-\s(.*)$/, '$1');

		verdictHelper.getSubmissionStatus(submissionId, table.eq(1).text(), problem, table.eq(5).children('span').text(), table.eq(6).text(), table.eq(7).text());

		if (!verdictHelper.isWaiting(table.eq(5).children('span').text()))
			return process.stdout.write('\n');
			
		while (true) {
			let $ = await (() => { 
				return new Promise((resolve, reject) => {
					request.get({
						headers,
						url: submissionUrl,
						jar: request.jar(new toughcookie(cookiePath)),
						timeout: 45000
					}, (err, res, body) => {
						if (err)
							return reject(err);
						resolve(cheerio.load(body, { decodeEntities: false }));
					})
				})
			})()

			let table = $('.datatable table tr').eq(1).children('td');

			let problemItem = table.eq(2).children('a');
			let problem = '';
			// problem += problemItem.attr('href').replace(/\/([^\/]*)\/([^\/]*)\/problem\/([^\/])/, '$1 $2$3 - ');
			// problem += problemItem.attr('title').replace(/[^\s]+\s-\s(.*)$/,'$1').replace(/\s*(.*)\s*$/, '$1').replace(/^.+\s-\s(.*)$/, '$1');

			verdictHelper.getSubmissionStatus(table.eq(0).text(), table.eq(7).text(), problem, table.eq(4).text(), table.eq(5).text(), table.eq(6).text());

			if (!verdictHelper.isWaiting(table.eq(4).text()))
				return process.stdout.write('\n')
		}
		
		} catch (e) {
			console.log(chalk.red().bold('[-] Failed to Submit!'))
			console.log(e);
		}
});

program.parse(process.argv);