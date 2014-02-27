var passport = require('passport');
var loginHelper = require("../helpers/loginHelper");
var Pivotal = require("../helpers/apiHelper");
var RedisHelper = require("../helpers/redisHelper");
module.exports.controller = function(app){
	app.get('/',loginHelper.ensureAuthenticated,function(req,res){
		
		RedisHelper.getGravatarEmail(req.user.username,function(err,email){
			var user = req.user;
			user.gravatarEmail = email;
			res.render('home/index',{title: "GlobalEnglish PivotalTracker Helper",user:user,message:req.session.messages});
		});
		
	});

	app.get('/login',function(req,res){
		if(req.isAuthenticated())
			return res.redirect("/");
		var messages= req.session.messages;
		delete req.session.messages; //to avoid showing the same message in further get requests.
		res.render('home/login',{title:"Login",user:req.user,message:messages});
	});

	//POST /login
	//	Using passport.authenticate() as route middleware to authenticate the request.
	//	If authentication fails, user will be back to login page. Otherwise redirect to home page.
	//
	//	curl -v -d "username=something&password=secret" http://localhost:3000/login

	app.post('/login',function(req,res,next){

		
		passport.authenticate('local',function(err,user,info){
			
			if(err){
				return next(err);
			}

			if(!user){
				
				req.session.messages = [info.message];
				return res.redirect('/login');
			}
			
			req.logIn(user,function(err){
				if(err) 
					return next(err);
				
				var gravatarEmail = req.body.gravatar;
				if(gravatarEmail)
					RedisHelper.setGravatarEmail(req.user.username,gravatarEmail);
				
				return res.redirect("/");
			});
		})(req,res,next);
	});


	app.get('/logout',function(req,res){
		req.logout();
		res.redirect('/login');
	});
	
}