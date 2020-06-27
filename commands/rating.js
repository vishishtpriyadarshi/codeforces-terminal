const comma = require('comma-number');
const handleError = require('cli-handle-error');
const axios = require('axios');
const to = require('await-to-js').default;
const moment = require('moment');
const blessed = require('blessed');
const contrib = require('blessed-contrib');
const ora = require('ora');

const spinner = ora({ spinner: 'growVertical' });


const ratingData = {
	async display(arg){
		
		spinner.text = 'Fetching rating graph...';
		spinner.start();
	
		let handle = arg.handle;
		
		const [err, response] = await to(
				axios.get('https://codeforces.com/api/user.rating?handle='+handle)
			);
		
			if(err)
				spinner.fail();
		
			handleError(`codeforces is down, try again later.`, err, false);
			if (response.status === 404) {
				spinner.stopAndPersist();
				console.log(
					`${red(
						`${sym.error} Handle "${handle}" does not exist...`
					)}\n`
				);
				process.exit(0);
			}
			
			spinner.succeed();
			
			const screen = blessed.screen();
			const line = contrib.line({
				style: {
					text: 'white',
					baseline: 'green'
				},
				xLabelPadding: 3,
				xPadding: 3,
				abbreviate: true,
				showLegend: true,
				legend: { width: 20 },
				wholeNumbersOnly: false,
				label: handle.toUpperCase()
			});
		
			const bar = contrib.bar(
						{ label: 'Rating'
						   , barWidth: 4
						   , barSpacing: 6
						   , xOffset: 0
						   , maxHeight: 9
						})
			
		
			const contests = response.data.result;
			// contests.forEach(function(eachContest) {
			// console.log(eachContest.newRating);
			// });
			
			//console.log(contests.map(eachContest => eachContest.contestId));
			const parsedData = {
				title: `Rating: ${handle}`,
				x: Object.values(response.data.result),
				y: contests.map(eachContest => eachContest.newRating),
				style: {
					line: 'cyan'
				}
			};
			
			// screen.append(bar) //must append before setting data
			// bar.setData(
			// 		{ 
			// 			titles: contests.map(eachContest => eachContest.contestId),
			// 			data: contests.map(eachContest => eachContest.newRating)
			// 		})
		
			screen.append(line);
			line.setData([parsedData]);      
			screen.render();
		
		
			await new Promise((resolve, _) => {
				screen.key(['escape', 'q', 'C-c', 'enter', 'space'], (ch, key) => {
					return process.exit(0);
				});
			});
	},
	
	async compare(arg){
		
		const spinner1 = ora({ spinner: 'growVertical' });
		const spinner2 = ora({ spinner: 'growVertical' });
		
		let handle1 = arg.handle1;
		let handle2 = arg.handle2;
		
		
		spinner1.text = 'Fetching rating graph of ' + handle1 + '...';
		spinner1.start();
		
		const [err1, response1] = await to(
				axios.get('https://codeforces.com/api/user.rating?handle='+handle1)
			);
		
			if(err1)
				spinner1.fail();
		
			handleError(`codeforces is down, try again later.`, err1, false);
			if (response1.status === 404) {
				spinner1.stopAndPersist();
				console.log(
					`${red(
						`${sym.error} Handle "${handle1}" does not exist...`
					)}\n`
				);
				process.exit(0);
			}
			
			spinner1.succeed();
		
			spinner2.text = 'Fetching rating graph of ' + handle2 + '...';
			spinner2.start();

			const [err2, response2] = await to(
					axios.get('https://codeforces.com/api/user.rating?handle='+handle2)
				);

				if(err2)
					spinner2.fail();

				handleError(`codeforces is down, try again later.`, err2, false);
				if (response2.status === 404) {
					spinner2.stopAndPersist();
					console.log(
						`${red(
							`${sym.error} Handle "${handle2}" does not exist...`
						)}\n`
					);
					process.exit(0);
				}

				spinner2.succeed();
			
			const screen = blessed.screen();
			const line = contrib.line({
				style: {
					text: 'white',
					baseline: 'green'
				},
				xLabelPadding: 3,
				xPadding: 3,
				abbreviate: true,
				showLegend: true,
				legend: { width: 20 },
				wholeNumbersOnly: false,
				label: 'Rating Graph'
			});
		
			const contests1 = response1.data.result;
			const contests2 = response2.data.result;
		
		
			const parsedData1 = {
				title: `Rating: ${handle1}`,
				x: Object.values(response1.data.result),
				y: contests1.map(eachContest => eachContest.newRating),
				style: {
					line: 'cyan'
				}
			};
			
			const parsedData2 = {
				title: `Rating: ${handle2}`,
				x: Object.values(response2.data.result),
				y: contests2.map(eachContest => eachContest.newRating),
				style: {
					line: 'red'
				}
			};
		
			screen.append(line);
			line.setData([parsedData1, parsedData2]);      
			screen.render();
		
		
			await new Promise((resolve, _) => {
				screen.key(['escape', 'q', 'C-c', 'enter', 'space'], (ch, key) => {
					return process.exit(0);
				});
			});
	}
};

module.exports = ratingData;
