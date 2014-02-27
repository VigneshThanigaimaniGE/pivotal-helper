var config = {
	test:{
		username:"put_username_here",
		password:"put_password_here",
		token:"put_token_here",
		projectId:"put_projectId_here"
	},
	redis:{
		port:process.env.REDIS_PORT || 18708,
		host:process.env.REDIS_HOST || "pub-redis-18708.us-central1-1-1.gce.garantiadata.com"
	}
}
module.exports = config;