GlobalEnglish PivotalTracker Helper
====================================

Run `npm update` after cloning the repo to install necessary modules.

Run `npm test` to run tests, to see if everything works fine. 
> Before testing, edit the config.js file, and add your pivotal tracker username and password. (Do not forget to remove your real username and password before committing to github)

###API Helper
Small example on how to use the library. 
First call the static method `getUser()` which will also set the `token` for further api calls. see the apiHelper.js to see all currently implemented functions. 
 
  
    var Pivotal = require("../helpers/apiHelper");
    var pivotal = null;
    Pivotal.getUser("username","password",function(error,user){
      pivotal = new Pivotal(user.api_token);
      pivotal.getMyStories(function(err,stories){
        JSON.stringify(stories);
      });
    });

###Login

Uses the [`passport`](https://www.npmjs.org/package/passport) module, with `LocalStrategy` 

This project does not store any user data now, and definitely will not store the user's password in the db.


###To automatically restart the nodejs server, while making changes to code,

Install the [`supervisor`](https://www.npmjs.org/package/supervisor) module globally by running `npm install -g supervisor`

Then run `npm start` or `supervisor app.js` to keep the node.js running forever.