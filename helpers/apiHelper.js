///// API Library for Pivotal Tracker Version 5.
///// author: Vignesh P T
var request = require('request');

var Pivotal = function(token){
	this.token = token;
};

Pivotal.debug = false;

Pivotal.baseUrl = "https://www.pivotaltracker.com/services/v5";


//gets the user details from API. 
//e.g getUser(token, callback) or getUser(username,password,callback)
//we should get the token, and in the callback we should pass token to Pivotal constructor.
Pivotal.getUser = function(){
	var options ={};
	var callback=undefined;
	var token= undefined;
	try{
		if(arguments.length == 2){
			//only token is passed
			token =arguments[0];
			callback= arguments[1];
		}else if(arguments.length ==3){
			//username and password is passed
			options = {
				auth:{
					user:arguments[0],
					pass:arguments[1]
				}
			};
			callback = arguments[2];
		}
		
		Pivotal.apiCall("/me",options,callback,token);	
	}
	catch(e){
		this.log("Wrong parameters: "+e.message);
	}
	
}

Pivotal.prototype.getMyUser = function(callback){
	this.apiCall("/me",null,callback);
}

Pivotal.prototype.getProject = function(projectId,cb){

	this.apiCall("/projects/"+projectId,null,cb);
};

Pivotal.prototype.apiCall = function(url,opts,cb){
	Pivotal.apiCall(url,opts,cb,this.token);
}

Pivotal.prototype.getMyStories = function(projectId,callback){
	var url= "/projects/"+projectId+"/stories";
	url = url += "?filter=owned_by:"+this.user.id;
	this.apiCall(url,null,callback);

}
Pivotal.apiCall = function(url,opts,cb,token){
	var options = {
		url: Pivotal.baseUrl + url,
		headers:{}
	}
	//check if options.auth is passed, and add to options if present
	if(opts !=null && opts.auth){
		options.auth = {};
		options.auth.user = opts.auth.user;
		options.auth.pass = opts.auth.pass;
	}

	//if token is present, then attach to header
	if(token){
		options.headers["X-TrackerToken"] = token;
	}
	//make the call
	request(options,function(error,response,data){
		// console.log('request// options: '+JSON.stringify(options)+
		// 	"error: "+(error||"")+
		// 	"response: "+(response.statusCode || "")+
		// 	"data: "+(data||""))
		if(error != null){
			cb(error,null);
			return;
		}
		if(response && response.statusCode!=200){
			cb({message:response.body, code:response.statusCode},null);
			return;
		}
		var parsedData = JSON.parse(data);
		cb(null,parsedData);
	});
}

Pivotal.log = function(message){
	//log to console only when debug options is enabled
	if(Pivotal.debug)
		console.log(message);
};
module.exports = Pivotal;