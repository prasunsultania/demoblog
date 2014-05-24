test:
	./node_modules/.bin/mocha --reporter mocha-lcov-reporter --timeout 20000 ./test/test*.js > ./test/coverage.lcov

.PHONY: test