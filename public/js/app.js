'use strict';

var ROOT;
if (window.location.href.indexOf('localhost') !== -1) {
    ROOT = "";
} else {
	//Add CDN provider, alternatively
	ROOT = "";
}

/* App Module */
angular.module('awesomeBlog', ['ngRoute', 'awesomeBlog.controllers']).config(['$routeProvider', '$locationProvider', '$sceDelegateProvider',                                                                                               
  function($routeProvider, $locationProvider, $sceDelegateProvider) {
	$sceDelegateProvider.resourceUrlWhitelist([
	  // Allow same origin resource loads.
	  'self',
	  // Allow loading from our assets domain.
	  ROOT + '**'
	]);
  $routeProvider.
    when('/', {
      redirectTo: '/profile'
    }).
    when('/profile', {
      templateUrl: ROOT + '/partials/profile.html',
      controller: 'profileCtrl'
    })/*.
    otherwise({
      redirectTo: '/default'
    })*/;
    if (window.history && window.history.pushState) {
       $locationProvider.html5Mode(true);
    }
}]);
