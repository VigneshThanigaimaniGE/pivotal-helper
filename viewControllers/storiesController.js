var loginHelper = require("../helpers/loginHelper");
var Pivotal = require("../helpers/apiHelper");
module.exports.controller = function(app){

	app.get('/project/:project_id',loginHelper.ensureAuthenticated,function(req,res){
		var pivotal = new Pivotal(req.user.api_token);
		pivotal.user = req.user; //this is must for getMyStories to work. //need to refactor later.
		var projectId = req.params.project_id;
		
		//get the Project name, from req.user.projects object
		var projectName; 
		try
		{
			projectName = req.user.projects.filter(function(project){
				return project.project_id == projectId;
			})[0].project_name;
			
			pivotal.getMyStories(projectId,function(err,stories){
				
				res.render("project/index",{title:projectName,stories:stories,user:req.user})
			});
		}
		catch(e){
			Pivotal.log(e);
			res.send(404,"Project not found");
		}
		
	});
}