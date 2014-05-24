test:
	./node_modules/.bin/mocha --reporter mocha-lcov-reporter --timeout 20000 test\test*.js    

.PHONY: test