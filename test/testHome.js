var app = require('../app');
var request = require('./utils/request');
var expect = require('chai').expect;
User = require('../models/user');
var unitTestEmail = 'test' + new Date().getTime() + '@awesomeblog.io', 
  unitTestPassword = 'test' + new Date().getTime() + 'tset';

describe('test Home',
    function() {

      before(function(done) {
        // give server time to start
        console.log(process.env.NODE_ENV);
        User.remove({}, function(err) {
          if (err) {
            throw err;
          }
          setTimeout(done, 3000);
        });
      });

      describe('/', function() {
        it('should give a response', function(done) {
          var reqClient = new request();
          reqClient.request({
            url : 'http://login.localhost.in:' + process.env.NODEJS_PORT
          }).then(function(res) {
            expect(res).to.not.equal('null');
            expect(res).to.not.equal('undefined');
            var body = res.getBody().toString();
            expect(body).to.not.equal('null');
            expect(body).to.not.equal('undefined');
            done();
          }, function() {
            console.log('test failed');
            expect(true).to.equal(false);
            done();
          });
        });
      });

      describe('/login',
          function() {
            var reqClient = new request();            
            before(function(done) {
              User.registerNewUser(unitTestEmail, unitTestPassword, function(
                  err, user) {
                if (err) {
                  console.err(err.message);
                  throw err;
                }
                if (!user)
                  throw new Error('!user');
                done();
              });
            });

            it('should give a response', function(done) {
              reqClient.request(
                  {
                    url : 'http://login.localhost.in:'
                        + process.env.NODEJS_PORT + "/login"
                  }).then(function(res) {
                expect(res).to.not.equal('null');
                expect(res).to.not.equal('undefined');
                var body = res.getBody().toString();
                expect(body).to.not.equal('null');
                expect(body).to.not.equal('undefined');
                done();
              }, function() {
                expect(true).to.equal(false);
                done();
              });
            });

            it('should be able to make a login', function(done) {
              reqClient.request(
                  {
                    url : 'http://login.localhost.in:'
                        + process.env.NODEJS_PORT + "/login",
                    method : 'POST',
                    body : {
                      email : unitTestEmail,
                      password : unitTestPassword
                    }
                  }).then(
                  function(res) {
                    console.log('logged in');
                    expect(res).to.not.equal('null');
                    expect(res).to.not.equal('undefined');
                    expect(res.url).to.equal('http://login.localhost.in:'
                        + process.env.NODEJS_PORT + '/profile');
                    var body = res.getBody().toString();
                    expect(body).to.contain(unitTestEmail);
                    done();
                  }, function() {
                    expect(true).to.equal(false);
                    done();
                  });
            });

            it('should be able to logout', function(done) {
              reqClient.request(
                  {
                    url : 'http://login.localhost.in:'
                        + process.env.NODEJS_PORT + "/logout",
                    method : 'GET'
                  }).then(function(res) {
                console.log('logged out');
                expect(res).to.not.equal('null');
                expect(res).to.not.equal('undefined');
                var body = res.getBody().toString();
                expect(body).to.not.contain(unitTestEmail);
                done();
              }, function() {
                expect(true).to.equal(false);
                done();
              });
            });
          });

      describe('/signup', function() {
        it('should give a response', function(done) {
          var reqClient = new request();
          reqClient.request(
              {
                url : 'http://login.localhost.in:' + process.env.NODEJS_PORT
                    + "/signup"
              }).then(function(res) {
            expect(res).to.not.equal('null');
            expect(res).to.not.equal('undefined');
            var body = res.getBody().toString();
            expect(body).to.not.equal('null');
            expect(body).to.not.equal('undefined');
            done();
          }, function() {
            expect(true).to.equal(false);
            done();
          });
        });

        it('should not allow signup without email', function(done) {
          var reqClient = new request();
          reqClient.request(
              {
                url : 'http://login.localhost.in:' + process.env.NODEJS_PORT
                    + "/signup",
                method : 'POST',
                body : {
                  password : 'somepassword'
                }
              }).then(
              function(res) {
                expect(res).to.not.equal('null');
                expect(res).to.not.equal('undefined');
                var body = res.getBody().toString();
                expect(body).to.not.equal('null');
                expect(body).to.not.equal('undefined');
                expect(res.url).to.equal('http://login.localhost.in:'
                    + process.env.NODEJS_PORT + '/signup');
                done();
              }, function() {
                expect(true).to.equal(false);
                done();
              });
        });
        
        it('should not allow signup without password', function(done) {
          var reqClient = new request();
          reqClient.request(
              {
                url : 'http://login.localhost.in:' + process.env.NODEJS_PORT
                    + "/signup",
                method : 'POST',
                body : {
                  email : 'someemail@awesomeblog.io'
                }
              }).then(
              function(res) {
                expect(res).to.not.equal('null');
                expect(res).to.not.equal('undefined');
                var body = res.getBody().toString();
                expect(body).to.not.equal('null');
                expect(body).to.not.equal('undefined');
                expect(res.url).to.equal('http://login.localhost.in:' + process.env.NODEJS_PORT + '/signup');
                done();
              }, function() {
                expect(true).to.equal(false);
                done();
              });
        });
        
        it('should not re-register for an existing user', function(done) {
          var reqClient = new request();
          reqClient.request(
              {
                url : 'http://login.localhost.in:' + process.env.NODEJS_PORT
                    + "/signup",
                method : 'POST',
                body : {
                  email : unitTestEmail,
                  password : 'somethingsomething'
                }
              }).then(
              function(res) {
                expect(res).to.not.equal('null');
                expect(res).to.not.equal('undefined');
                var body = res.getBody().toString();
                expect(body).to.not.equal('null');
                expect(body).to.not.equal('undefined');
                expect(res.url).to.equal('http://login.localhost.in:' + process.env.NODEJS_PORT + '/signup');
                done();
              }, function() {
                expect(true).to.equal(false);
                done();
              });
        });
      });
      
      describe('servepublicfiles', function() {
        it('should serve js file', function(done){
          var reqClient = new request();
          reqClient.request(
              {
                url : 'http://login.localhost.in:' + process.env.NODEJS_PORT
                    + "/js/app.js"
              }).then(function(res) {
            expect(res).to.not.equal('null');
            expect(res).to.not.equal('undefined');
            var body = res.getBody().toString();
            expect(body).to.not.equal('null');
            expect(body).to.not.equal('undefined');
            done();
          }, function() {
            expect(true).to.equal(false);
            done();
          });        
        });
        
        //make sure serving from cache does not breaks, we cant really test if was served from cache
        it('should serve js file twice', function(done){
          var reqClient = new request();
          reqClient.request(
              {
                url : 'http://login.localhost.in:' + process.env.NODEJS_PORT
                    + "/js/app.js"
              }).then(function(res) {
            expect(res).to.not.equal('null');
            expect(res).to.not.equal('undefined');
            var body = res.getBody().toString();
            expect(body).to.not.equal('null');
            expect(body).to.not.equal('undefined');
            done();
          }, function() {
            expect(true).to.equal(false);
            done();
          });        
        });
        
        it('should serve 404 for non-existing public resources', function(done){
          var reqClient = new request();
          reqClient.request({
            url : 'http://login.localhost.in:' + process.env.NODEJS_PORT + "/js/fakeup.js"
          }).then(function(res) {
            expect(true).to.equal(false);            
          }, function(res) {
            expect(res.statusCode).to.equal(404);
            done();
          });        
        });
      });
    });