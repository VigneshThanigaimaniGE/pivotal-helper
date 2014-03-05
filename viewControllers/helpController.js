module.exports.controller = function(app){

	app.get('/help',function(req,res){

		res.render('home/help',{title:"GE Pivotal Helper | Help",user:req.user});
	});
}