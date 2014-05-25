var app = require('../app');
var request = require('./utils/request');
var expect = require('chai').expect;
console.log('loaded test');
describe('test Home', function(){
  
  before(function(done){
	//give server time to start  
    setTimeout(done, 3000);
  });

  describe('/', function(){
    it('should give a response', function(done){
      var reqClient = new request();
      reqClient.request({
    	  url:'http://login.localhost.in:' + process.env.NODEJS_PORT
      }).then(function(res){
    	  expect(res).to.not.equal('null');
    	  expect(res).to.not.equal('undefined');    	  
    	  var body = res.getBody().toString();    	      	  
    	  expect(body).to.not.equal('null');
    	  expect(body).to.not.equal('undefined');    	  
    	  done();
      }, function(){
    	  console.log('test failed');
    	  expect(true).to.equal(false);
    	  done();
      })
    });
  });
  
  describe('/login', function(){
    it('should give a response', function(done){
      var reqClient = new request();
      reqClient.request({
    	  url:'http://login.localhost.in:' + process.env.NODEJS_PORT + "/login"
      }).then(function(res){
    	  expect(res).to.not.equal('null');
    	  expect(res).to.not.equal('undefined');    	  
    	  var body = res.getBody().toString();    	      	  
    	  expect(body).to.not.equal('null');
    	  expect(body).to.not.equal('undefined');    	  
    	  done();
      }, function(){    	  
    	  expect(true).to.equal(false);
    	  done();
      })
    });
  });
  
  describe('/signup', function(){
    it('should give a response', function(done){
      var reqClient = new request();
      reqClient.request({
    	  url:'http://login.localhost.in:' + process.env.NODEJS_PORT + "/signup"
      }).then(function(res){
    	  expect(res).to.not.equal('null');
    	  expect(res).to.not.equal('undefined');    	  
    	  var body = res.getBody().toString();    	      	  
    	  expect(body).to.not.equal('null');
    	  expect(body).to.not.equal('undefined');    	  
    	  done();
      }, function(){    	  
    	  expect(true).to.equal(false);
    	  done();
      })
    });
  });
});