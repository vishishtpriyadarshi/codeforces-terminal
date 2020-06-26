const program = require('commander');
const request = require('request');
const cheerio = require('cheerio');
const async = require('async');

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
			let url = verdictHelper.generateURL();
			
			let reqOptions = {
				uri: url,
				json: true,
				timeout: 45000
			};
			
			
			var keepWatching = true;
			async.whilst(
				() => {
					return keepWatching;
				},
				(callback) => {

					spinner.text = 'Refreshing..';
					spinner.start();

					request
						.get(reqOptions, (error, response, body) => {

							if(error){
								return callback(error);
							}

							let { statusCode } = response;
							if( statusCode !== 200 ){
								return next( has(body,'comment') ? body.comment : `HTTP failed with status ${statusCode}`);
							}

							if( body.status !== 'OK' ){
								return callback(body.comment);
							}

							spinner.succeed();
							keepWatching = generateTable(body.result);

							//
							// Still testing, Wait x seconds and get status again
							//
							if( keepWatching ) {
								return setTimeout(() => {
									callback();
								}, STATUS_DELAY);
							}

							return callback();
						});
				},
				async.next
			);
				
		// ===================================================
			
		
		} catch (e) {
			console.log(chalk.red().bold('[-] Failed to Submit!'))
			console.log(e);
		}
});

program.parse(process.argv);