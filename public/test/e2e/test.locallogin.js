'use strict';
var app = require('../../../app'), 
  mongoose = require('mongoose'),
  User  = require('../../../models/user'),
  chai = require('chai'), 
  chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

var expect = chai.expect, 
  config = require('../protractor-config.js').config;

describe('integrator app', function() {   
  var ptor = protractor.getInstance(),
    functionalTestEmail = 'test' + new Date().getTime() + '@awesomeblog.io',
    functionalTestPassword = 'test' + new Date().getTime() + 'tset';

  var driver = browser.driver;

  before(function() {    
    protractor.promise.controlFlow().execute(function() {
      var deferred = new protractor.promise.Deferred();
      User.remove({}, function(err) { 
        console.log('removed all users');
        User.registerNewUser(functionalTestEmail, functionalTestPassword, function(err, user) {
          if (err)
            throw err;
          if (!user)
              throw new Error('!user');                                  
          if(err){
            throw err;
          }
          //give time for server to start
          browser.sleep(5000);
          console.log("loading: " + config.baseUrl + "/login");
          driver.get(config.baseUrl + "/login");            
          driver.findElement(By.name("email")).sendKeys(functionalTestEmail);
          driver.findElement(By.name("password")).sendKeys(functionalTestPassword);
          driver.findElement(By.className("btn-warning")).click();          
          console.log("Logged In");          
          deferred.fulfill(true);
        });                                    
      });                       
      return deferred.promise;
    });
  });
  ptor.ignoreSynchronization = true;
  it('should land on Profile page', function() {
    ptor.waitForAngular().then(
      function() {
        expect(browser.getTitle()).to.eventually.equal('Awesome Blog');
        expect(browser.getCurrentUrl()).to.eventually.equal(config.baseUrl + "/profile");
        browser.sleep(1000);
        driver.findElement(By.css('a[href="/logout"]')).click();
      });
  });  
});