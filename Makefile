all:

database:
	make -C src/data

tables:
	make -C src/data

.PHONY: all database tables
