all:

database:
	make -C src/data

.PHONY: all database
