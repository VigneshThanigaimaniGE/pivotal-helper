
/**
 * Module dependencies.
 */

var express = require('express'),
	http = require('http'),
	path = require('path'),
	fs = require('fs'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
	app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon('public/images/favicon.gif'));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// dynamically include routes (Controller)
fs.readdirSync(__dirname+'/viewControllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require(__dirname+'/viewControllers/' + file);
      route.controller(app);
  }
});

// user: {username:"something",password:"something"}
//Passport session setup
var Pivotal = require("./helpers/apiHelper.js");
passport.serializeUser(function(user,done){
  var toSaveInSession = {username:user.username,token:user.api_token,name:user.name,id:user.id};
  done(null,toSaveInSession);
});

passport.deserializeUser(function(user, done){
  Pivotal.getUser(user.token,function(err,userObj){
    if(!err)
      done(null,userObj);
    else
      done(err,null);
      
  });
});

//Use the LocalStrategy within passport
passport.use(new LocalStrategy(
  function(username,password,done){
    process.nextTick(function(){
      Pivotal.getUser(username,password,function(err,userObj){
        if(err){
          if(err.code==403){
            return done(null,false,{message:JSON.parse(err.message).error});
          }
          return done(err);
        }
        return done(null,userObj);
      })
    });
  }
));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
exports.app = app;