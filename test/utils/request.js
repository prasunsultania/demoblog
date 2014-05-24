var Q = require('q');
var requestor = require('request');

module.exports = function(reqObject) {

	var cookiesJar = requestor.jar();
	var request = requestor.defaults({
		jar : cookiesJar
	});

	this.request = function(config, promise) {
		var deferred = promise || Q.defer(), that = this;

		var reqConfig = {
			method : config.method || 'GET',
			encoding : null,
			url : config.url
		};

		if (config.body && config.method === 'POST') {
			reqConfig.form = config.body;
		}
		
		console.log('requesting:' + reqConfig.url)

		request(reqConfig, function(error, response, body) {
			
			console.log('got a response man');
			
			if (!response) {
				// TODO Handle it
				return deferred.reject();
			}

			response.getBody = function() {
				return body;
			};

			response.getHeader = function(header) {
				return response.headers[header];
			};

			response.url = response.request.uri.href;

			if (response.statusCode === 200) {
				console.log('got a resolved response man');
				return deferred.resolve(response, config.url);
			}

			if (response.statusCode !== 302) {
				return deferred.reject(response);
			}

			var loc = response.getHeader('location');

			if (loc.indexOf('http') !== 0) {
				loc = config.url.match(/http:\/\/[^\/]*\.+[^\/]+/)[0] + loc;
			}

			that.request({
				url : loc,
				Referrer : config.Referrer,
				method : 'GET',
			}, deferred);

		});

		return deferred.promise;
	};
};