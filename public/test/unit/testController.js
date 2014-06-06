'use strict';

/* jasmine specs for controllers go here */
describe('AwesomeBlog controllers', function() {

  beforeEach(module('awesomeBlog'));
  beforeEach(module('awesomeBlog.controllers'));
  
  beforeEach(inject(function(){
    window.GLOBALS = {};
    window.GLOBALS.localEmail = 'fake@fakesters.com';
    window.GLOBALS.localId = '1234567890';
    window.GLOBALS.localPassword = 'alocalpassword123';
    
    window.GLOBALS.fbEmail = 'fb@fakesters.com';
    window.GLOBALS.fbId = '124567980';
    window.GLOBALS.fbToken = '1234565ghghg';
    window.GLOBALS.fbName = 'Faking Fakester';
    
    window.GLOBALS.tEmail = 'fakester';
    window.GLOBALS.tId = '1224dffhgg6';
    window.GLOBALS.tToken = 'sfdg454gh5656';
    window.GLOBALS.tName = 'sfdgd23234';
    
    window.GLOBALS.gEmail = 'fake@fakesters.com';
    window.GLOBALS.gId = '124567980';
    window.GLOBALS.gToken = 'sfdg454gh5656';
    window.GLOBALS.gName = 'Faking Fakkester';  
  }));

  describe('AwesomeBlogCtrller', function(){
    var scope, ctrl, $rootScope;

    beforeEach(inject(function(_$rootScope_, $controller) {
      $rootScope = _$rootScope_;
      scope = $rootScope.$new();
      ctrl = $controller('profileCtrl', {$scope: scope});
    }));


    it('should have correct values for ', function() {
      expect($rootScope.localEmail).to.equal(window.GLOBALS.localEmail);
      expect($rootScope.localId).to.equal(window.GLOBALS.localId);
      expect($rootScope.localPassword).to.equal(window.GLOBALS.localPassword);
      expect($rootScope.fbEmail).to.equal(window.GLOBALS.fbEmail);
      expect($rootScope.fbId).to.equal(window.GLOBALS.fbId);
      expect($rootScope.fbToken).to.equal(window.GLOBALS.fbToken);
      expect($rootScope.fbName).to.equal(window.GLOBALS.fbName);
      expect($rootScope.tEmail).to.equal(window.GLOBALS.tEmail);
      expect($rootScope.tId).to.equal(window.GLOBALS.tId);
      expect($rootScope.tToken).to.equal(window.GLOBALS.tToken);
      expect($rootScope.tName).to.equal(window.GLOBALS.tName);
      expect($rootScope.gEmail).to.equal(window.GLOBALS.gEmail);
      expect($rootScope.gId).to.equal(window.GLOBALS.gId);
      expect($rootScope.gToken).to.equal(window.GLOBALS.gToken);
      expect($rootScope.gName).to.equal(window.GLOBALS.gName);
    });    
  });
  
});
