module.exports.controller = function(app){
	app.get('/',function(req,res){
		res.render('home/index',{title: "GlobalEnglish PivotalTracker Helper"});
	});
}