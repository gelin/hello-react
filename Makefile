.PHONY: build
build:
	npm install
	npm run build

.PHONY: run
run:
	npm install \
	&& npm start
