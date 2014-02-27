var config = {
	test:{
		username:"put_username_here",
		password:"put_password_here",
		token:"put_token_here",
		projectId:"put_projectId_here"
	},
	redis:{
		port:process.env.REDIS_PORT || "port_number",
		host:process.env.REDIS_HOST || "host"
	}
}
module.exports = config;