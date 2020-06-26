const request = require('request');
const inquirer = require('inquirer');

const path = require('path');
const fs = require('fs');
const ora = require('ora');

const headerObject = require('../lib/headerObject');
const {cookiePath} = require('../lib/cookiePath')
const toughcookie = require('tough-cookie-filestore');

const login = require('../commands/login');
const compiler = require('../commands/compiler');

const submit = {

    getSubmissionDetails() {
        return new Promise ( async (resolve, reject) => {
            try {
                const fileOptions = fs.readdirSync(process.cwd());
                const input = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'index',
                        message: 'Enter Question Index [A/B/C/D/E/F]: '
                    },
                    {
                        type: 'input',
                        name: 'cid',
                        message: 'Enter Contest ID: '   
                    },
                    {
                        type: 'list',
                        name: 'filename',
                        message: 'Select file to be submitted: ',
                        choices: fileOptions
                    }
                ]);
				
                let submissionDetails = {
                    submittedProblemIndex: input.index.toUpperCase(),
                    source: fs.readFileSync(path.join(process.cwd(), input.filename), 'ascii'),
                    url: `https://codeforces.com/contest/${input.cid}/submit`,
					compiler: compiler.getCompiler()
                };
                resolve(submissionDetails);                
            } 
            catch (error) {
                return reject (error);
            }
        });
    },

    submitCode(params) {
        return new Promise ( async (resolve, reject) => {
            const formData = {
				csrf_token: await login.getCSRFToken(),
                action: "submitSolutionFormSubmitted",
                submittedProblemIndex: params.submittedProblemIndex,
                source: params.source,
                programTypeId: params.compiler,
                sourceFile: '',
            }
			
			const headerDetails = {
                origin : 'https://codeforces.com',
                referer : 'https://codeforces.com/problemset/submit'
            }
			const headers = headerObject(headerDetails);
			
            const requestObject = {
                url: params.url,
                headers,
                jar: request.jar(new toughcookie(cookiePath)),
                timeout: 45000,
                formData
            };
			
            request.post(requestObject, (error, response, body) => {
                if (error)
					return reject (error);
				
				//console.log(body.result);
                resolve();
            })
        });
    }

}

module.exports = submit;