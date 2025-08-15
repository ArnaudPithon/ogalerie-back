all: build

database:
	make -C src/db

functions:
	make -C src/db functions

build:
	make -C src build

start:
	make -C src start

dev:
	make -C src dev

dev-watch:
	make -C src dev-watch

test:
	make -C src test

update:
	make -C src/db/update


.PHONY: all database functions build start dev test update
