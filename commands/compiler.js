const inquirer = require('inquirer');
const CfuserManager = require('../lib/CfuserManager');
const chalk = require('chalk');


const compilerCodeToCompilerName = {
    '2': 'Microsoft Visual C++ 2010',
    '3': 'Delphi 7',
    '4': 'Free Pascal 3.0.2',
    '6': 'PHP 7.2.13',
    '7': 'Python 2.7.15',
    '8': 'Ruby 2.0.0p645',
    '9': 'C# Mono 5.18',
    '12': 'Haskell GHC 8.6.3',
    '13': 'Perl 5.20.1',
    '19': 'OCaml 4.02.1',
    '20': 'Scala 2.12.8',
    '28': 'D DMD32 v2.091.0',
    '31': 'Python 3.7.2',
    '32': 'Go 1.14',
    '34': 'JavaScript V8 4.8.0',
    '36': 'Java 1.8.0_162',
    '40': 'PyPy 2.7 (7.2.0)',
    '41': 'PyPy 3.6 (7.2.0)',
    '42': 'GNU G++11 5.1.0',
    '43': 'GNU GCC C11 5.1.0',
    '48': 'Kotlin 1.3.70',
    '49': 'Rust 1.42.0',
    '50': 'GNU G++14 6.4.0',
    '51': 'PascalABC.NET 3.4.2',
    '52': 'Clang++17 Diagnostics',
    '54': 'GNU G++17 7.3.0',
    '55': 'Node.js 9.4.0',
    '59': 'Microsoft Visual C++ 2017',
    '60': 'Java 11.0.5',
    '61': 'GNU G++17 9.2.0 (64 bit, msys 2)'
  };

const compilerNameToCompilerCode  = {
	'Microsoft Visual C++ 2010': '2',
	'Delphi 7': '3',
    'Free Pascal 3.0.2': '4',
	'PHP 7.2.13': '6',
    'Python 2.7.15': '7',
	'Ruby 2.0.0p645': '8',
	'C# Mono 5.18': '9',
	'Haskell GHC 8.6.3': '12',
	'Perl 5.20.1': '13',
	'OCaml 4.02.1': '19',
	'Scala 2.12.8': '20',
	'D DMD32 v2.091.0': '28',
	'Python 3.7.2': '31',
    'Go 1.14': '32',
	'JavaScript V8 4.8.0': '34',
	'Java 1.8.0_162': '36',
	'PyPy 2.7 (7.2.0)': '40',
    'PyPy 3.6 (7.2.0)': '41',
	'GNU G++11 5.1.0': '42',
    'GNU GCC C11 5.1.0': '43',
    'Kotlin 1.3.70': '48',
    'Rust 1.42.0': '49',
    'GNU G++14 6.4.0': '50',
	'PascalABC.NET 3.4.2': '51',
	'Clang++17 Diagnostics': '52',
    'GNU G++17 7.3.0': '54',
    'Node.js 9.4.0': '55',
    'Microsoft Visual C++ 2017': '59',
	'Java 11.0.5': '60',
    'GNU G++17 9.2.0 (64 bit, msys 2)': '61'  
}

const compiler = {
	async setCompiler(){
		const cfuserManager = new CfuserManager();
        const input = await inquirer.prompt([
            {
                type: 'list',
                name: 'compilerCode',
                message: 'Enter Compiler Code',
                choices: Object.keys(compilerNameToCompilerCode)
            }
        ]);
		
        cfuserManager.setCompiler(compilerNameToCompilerCode[input['compilerCode']]);
        console.log(chalk.green('[+] Compiler set successfully!'));
	},
	
	showCompiler() {
        try {
            const cfuserManager = new CfuserManager();
            console.log(chalk.yellow('[+] Using Compiler: ', compilerCodeToCompilerName[cfuserManager.getCompiler()]));
        } catch(error) {
            console.log(chalk.red(error));
        }
    },

    getCompiler() {
        const cfuserManager = new CfuserManager();
        if (!cfuserManager.getCompiler()) {
            console.log(chalk.red('[-] Compiler not found! Set compiler first'));
			return;
        }
        return cfuserManager.getCompiler();
    },
	
	removeCompiler(){
		try{
			const cfuserManager = new CfuserManager();
			cfuserManager.removeCompiler();
			
			console.log(chalk.green('[+] Compiler removed successfully !'));
			return;
		}
		catch (error){
			console.error(chalk.red(error.message));
		}
	}
};


module.exports = compiler;