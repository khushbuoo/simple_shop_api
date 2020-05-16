TESTS = $(shell find test -name "*.js")
REPORTER = list

test:
	@./node_modules/.bin/mocha --recursive \
		--require should \
		--reporter $(REPORTER) \
		--growl \
		$(TESTS)

.PHONY: test bench