const forEach = require('lodash/forEach');
const jsonfile = require('jsonfile');
const inquirer = require('inquirer');
const qs = require('qs');
const Table = require('cli-table2');

const chalk = require('chalk');
const CfuserManager = require('../lib/CfuserManager');


const verdictIntrepreter = {
	FAILED: 'Failed',
    OK: 'Accepted',
    PARTIAL: 'Partial',
    COMPILATION_ERROR: 'Compilation error',
    RUNTIME_ERROR: 'Runtime error',
    WRONG_ANSWER: 'Wrong answer',
    PRESENTATION_ERROR: 'Presentation error',
    TIME_LIMIT_EXCEEDED: 'Time limit exceeded',
    MEMORY_LIMIT_EXCEEDED: 'Memory limit exceeded',
    IDLENESS_LIMIT_EXCEEDED: 'Idleness limit exceeded',
    SECURITY_VIOLATED: 'Security Violated',
    CRASHED: 'Crashed',
    INPUT_PREPARATION_CRASHED: 'Input Preparation Crashed',
    CHALLENGED: 'Challenged',
    SKIPPED: 'Skipped',
    TESTING: 'Running on tests',
    REJECTED: 'Rejected'
};

const verdict = {
	generateTable(run){

		let table = new Table({
			head: [ GN('Id'), GN('Problem') , GN('Lang'), GN('Verdict'), GN('Time'), GN('Memory') ]
		});

		let done = true;
		let user = '';

		forEach(runs, (run) => {

			let { id, contestId, problem, programmingLanguage, verdict, passedTestCount, timeConsumedMillis, memoryConsumedBytes, author } = run;
			let memory = parseInt(memoryConsumedBytes,10) / 1000;
			let passed = parseInt(passedTestCount,10);
			user = author.members[0].handle;

			if( verdict === undefined || typeof verdict != 'string' ){
				done = false;
				verdict = chalk.white.bold('In queue');
			}
			else{
				switch (verdict){
					case 'TESTING':
						done = false;
						verdict = chalk.white.bold(verdictIntrepreter[verdict]);
						break;
					case 'OK':
						verdict = GB(verdicts[verdict]);
						break;
					case 'RUNTIME_ERROR':
					case 'WRONG_ANSWER':
					case 'PRESENTATION_ERROR':
					case 'TIME_LIMIT_EXCEEDED':
					case 'MEMORY_LIMIT_EXCEEDED':
					case 'IDLENESS_LIMIT_EXCEEDED':
						verdict = RB(`${verdictIntrepreter[verdict]} on test ${passed+1}`);
						break;
					default:
						verdict = RB(verdictIntrepreter[verdict]);
				}
			}

			table.push([
				id,
				`${contestId}${problem.index} - ${problem.name}`,
				programmingLanguage,
				verdict,
				`${timeConsumedMillis} MS`,
				`${memory} KB`
			]);
		});

		// Clear console in every refresh
		clear();

		log('');
		log(GB(`User: ${who}`));
		log(table.toString());

		return !done;
	},


 	generateURL() {
		
		const userDetails = new CfuserManager();
		
		let params = qs.stringify({
			handle: userDetails.getUser,
			from: 1,
			count: 1
		}, { encode: false });

		return `http://codeforces.com/api/user.status?${params}`;
	}
};

module.exports = verdict;