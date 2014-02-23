var passport = require('passport');
var loginHelper = require("../helpers/loginHelper");
var Pivotal = require("../helpers/apiHelper");
module.exports.controller = function(app){
	app.get('/',loginHelper.ensureAuthenticated,function(req,res){
		res.render('home/index',{title: "GlobalEnglish PivotalTracker Helper",user:req.user,message:req.session.messages});
	});

	app.get('/login',function(req,res){
		res.render('home/login',{title:"Login",user:req.user,message:req.session.messages});
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
				return res.redirect("/");
			});
		})(req,res,next);
	});


	app.get('/logout',function(req,res){
		req.logout();
		res.redirect('/login');
	});
	
}