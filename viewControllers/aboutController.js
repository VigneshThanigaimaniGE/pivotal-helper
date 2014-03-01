module.exports.controller = function(app){
	var GitHub = require("../helpers/githubHelper").GitHub;
	var repoUrl = require('../package.json').repository.url;
	app.get('/about',function(req,res){
		GitHub.getContributions(function(err,contributors){
			var errorMessage;
			if(err)
				errorMessage = err.message;

			res.render('about/index',{title:"GE Pivotal Helper | About",contributors:JSON.parse(contributors),
				repoUrl:repoUrl,
				error:errorMessage})
		})
		
	});
}