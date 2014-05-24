var app = require('../app');
var request = require('./utils/request');
var expect = require('chai').expect;
console.log('loaded test');
describe('test Home', function(){
  
	/*before(function(done){	
    done();
  });*/

  describe('/login', function(){
    it('should give a response', function(done){
      var reqClient = new request();
      reqClient.request({
    	  url:'http://login.localhost.in:' + process.env.NODEJS_PORT
      }).then(function(res){
    	  expect(res).to.not.equal('null');
    	  expect(res).to.not.equal('undefined');
    	  console.log('response received from server');
    	  var body = res.getBody().toString();    	      	  
    	  expect(body).to.not.equal('null');
    	  expect(body).to.not.equal('undefined');
    	  console.log('test is all clear');
    	  done();
      }, function(){
    	  expect(true).to.equal(false);
    	  done();
      })
    });
  });
});