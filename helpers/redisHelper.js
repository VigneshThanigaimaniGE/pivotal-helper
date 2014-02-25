var redis = require("redis"),
config = require("../config"),
client = redis.createClient({
	port:config.redis.port,
    host:config.redis.host
});
client.on("error", function (err) {
    console.log("Redis error event - " + client.host + ":" + client.port + " - " + err);
});
var RedisHelper = {
	getGravatarEmail:function(username,callback){
		client.get(username,function(err,email){
			if(err)
				callback(err,null);
			else
				callback(null,email);
		});
	},
	setGravatarEmail:function(username,email){
		client.set(username,email);
	}
}
module.exports = RedisHelper;