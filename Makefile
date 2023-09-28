all: build

database:
	make -C src/data

functions:
	make -C src/data functions

build:
	make -C src build

start:
	make -C src start

dev:
	make -C src dev

test:
	make -C src test

.PHONY: all database functions build start dev test
