'use strict';

/* Controllers */

angular.module('awesomeBlog.controllers', [])
.controller('profileCtrl', ['$scope', '$http', '$rootScope',
  function($scope, $http, $rootScope) {	
	$rootScope.localEmail = window.GLOBALS.localEmail;
	$rootScope.localId = window.GLOBALS.localId;
	$rootScope.localPassword = window.GLOBALS.localPassword;
	
	$rootScope.fbEmail = window.GLOBALS.fbEmail;
	$rootScope.fbId = window.GLOBALS.fbId;
	$rootScope.fbToken = window.GLOBALS.fbToken;
	$rootScope.fbName = window.GLOBALS.fbName;
	
	$rootScope.tEmail = window.GLOBALS.tEmail;
	$rootScope.tId = window.GLOBALS.tId;
	$rootScope.tToken = window.GLOBALS.tToken;
	$rootScope.tName = window.GLOBALS.tName;
	
	$rootScope.gEmail = window.GLOBALS.gEmail;
	$rootScope.gId = window.GLOBALS.gId;
	$rootScope.gToken = window.GLOBALS.gToken;
	$rootScope.gName = window.GLOBALS.gName;
  }
]);
