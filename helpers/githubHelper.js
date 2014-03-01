var request = require('request');
var GitHubHelper = {}

GitHubHelper.getContributions = function(callback){
	var url = "https://api.github.com/repos/VigneshThanigaimaniGE/pivotal-helper/contributors"
	request({
		url:url,
		headers:{
			'User-Agent':'vigneshthanigaimanige/pivotal-helper.git'
		}	
	}, function(err,res,data){
		if(err || res.statusCode!=200){
			if(res && res.statusCode == 403)
			{
				callback({message:"Rate limit exceeded."},null);
			}
			callback(err,null);
		}
		else{
			callback(null,data);
		}
	});
}
module.exports.GitHub = GitHubHelper;