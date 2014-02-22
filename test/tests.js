'use strict';
//simple test suite. in BDD style
var app = require('../app').app;
var should = require('should');

var request = require('supertest');
var config = require("../config");

var PivotalHelper = require("../helpers/apiHelper");
require('../helpers/polyfills')();

describe("API Helper",function(){
	this.timeout(5000); //some calls are taking more than 2000ms
	beforeEach(function(){
		PivotalHelper.debug = true;

	});

	describe("GetUserDetails from API",function(){
		it("call to getUser() with username and password should be successfull, and should get user details",function(done){
			PivotalHelper.getUser(config.test.username,config.test.password,function(error,user){
				console.log("error: "+error);
				should.not.exist(error);
				//PivotalHelper.log(user);
				done();
			});
		});

		it("call to getUser() with token should be successfull, and should get user details",function(done){
			PivotalHelper.getUser(config.test.token,function(error,user){
				should.not.exist(error);
				//PivotalHelper.log(user);
				done();
			})
		});


		it("call to getMyUser() with no params should get my details",function(done){
			PivotalHelper.getUser(config.test.username,config.test.password,function(error,user){
				var pivotal = new PivotalHelper(user.api_token);
				pivotal.getMyUser(function(err,userData){
					should.not.exist(err);
					//PivotalHelper.log(userData);
					done();
				});
			});
		})
	});


	describe("GetProject",function(){
		var pivotal = null;
		beforeEach(function(done){
			//create helper instance for 
			PivotalHelper.getUser(config.test.token,function(error,user){
				pivotal = new PivotalHelper(user.api_token);
				pivotal.user = user;
				done();
			});
		});
		it("call to getProject() should successfully get details for that project",function(done){
			pivotal.getProject(config.test.projectId,function(error,project){
				should.not.exist(error);
				//PivotalHelper.log(project);
				done();
			});
		});


		describe("Stories",function(){
			it("getMyStories() should return all stories owned by that person",function(done){
				var isMyStory = function(story){
					return story.owned_by_id == pivotal.user.id;
				}
				pivotal.getMyStories(config.test.projectId,function(error,stories){
					var parsedStories
					stories.every(isMyStory);
					done();
				});
			});
		});

	});



});

describe.skip("Controllers", function() {
	describe('homeController',function(){
		it('get request to / should load a page without error',function(done){
			request(app).get('/').end(function(err,res){
				res.should.have.status(200);
				should.not.exist(err);
				done();
			});
		});
	});  
});

