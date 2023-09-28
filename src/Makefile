NPM := /usr/bin/env pnpm

all: build

start:
	$(NPM) run start

dev:
	$(NPM) run dev

test:
	$(NPM) run test

build:
	$(NPM) install

tags:
	ctags -R api/

.PHONY: all start dev test build tags
