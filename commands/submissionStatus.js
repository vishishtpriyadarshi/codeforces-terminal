const verdict = {
	parseSubmissionID($) {
		
		return new Promise ( async (resolve, reject) => {
            try {
                let submissionId = $('.id-cell span').eq(0).html();
				if (/[0-9]{8}/.exec(submissionId) !== null) 
					return submissionId;
				
				submissionId = $(".id-cell a").eq(0).text();
				
				if (/[0-9]{8}/.exec(submissionId) !== null)
					return submissionId;
				
				throw new Error($.html());                
            } 
            catch (error) {
                return reject (error);
            }
        });
    },
	
	getSingleFormat(id, time, problem, verdict, utime, umem) {
    	//verdict = getColor(verdict);
    	return id + '   ' + time + '   ' + problem + '   ' + verdict + '   ' + utime + '   ' + umem;
	},
	
	getSubmissionStatus(id, time, problem, verdict, utime, umem) {
		
		time = time.replace(/^\s*(.*)\s*$/, '$1');
		verdict = verdict.replace(/^\s*(.*)\s*$/, '$1');
		utime = utime.replace(/^\s*(.*)\s*$/, '$1');
		umem = umem.replace(/^\s*(.*)\s*$/, '$1');

		let outputString = id + '   ' + time + '   ' + problem + '   ' + verdict + '   ' + utime + '   ' + umem;

		console.log(outputString);
	},
	
	isWaiting(text) {
		
		let waiting = false;
		text = text.replace(/^\s*(.*)\s*$/, '$1');
		console.log(text, " - ");
		console.log(text.indexOf('Accepted'));
		if(text.indexOf('Accepted') === -1)
			return true;
		if (text.indexOf('In queue') !== -1)
			waiting = true;
		if (text.indexOf('Running') !== -1);
			waiting = true;
		
    	return waiting;
	}
	
};

module.exports = verdict;