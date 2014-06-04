'use strict';

/* Controllers */

angular.module('awesomeBlog.controllers', [])
.controller('profileCtrl', ['$scope', '$http', '$rootScope',
  function($scope, $http, $rootScope) {	
	$rootScope.localEmail = GLOBALS.localEmail;
	$rootScope.localId = GLOBALS.localId;
	$rootScope.localPassword = GLOBALS.localPassword;
	
	$rootScope.fbEmail = GLOBALS.fbEmail;
	$rootScope.fbId = GLOBALS.fbId;
	$rootScope.fbToken = GLOBALS.fbToken;
	$rootScope.fbName = GLOBALS.fbName;
	
	$rootScope.tEmail = GLOBALS.tEmail;
	$rootScope.tId = GLOBALS.tId;
	$rootScope.tToken = GLOBALS.tToken;
	$rootScope.tName = GLOBALS.tName;
	
	$rootScope.gEmail = GLOBALS.gEmail;
	$rootScope.gId = GLOBALS.gId;
	$rootScope.gToken = GLOBALS.gToken;
	$rootScope.gName = GLOBALS.gName;
  }
]);
