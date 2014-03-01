module.exports.controller = function(app){

	app.get('/about',function(req,res){
		res.render('about/index',{title:"GE Pivotal Helper | About"})
	});
}