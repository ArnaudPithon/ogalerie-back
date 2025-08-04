SHELL := /usr/bin/env sh
PG := /usr/bin/env psql
DB := ogalerie
DEBUG :=  # -e
fnc_files := tools.pgsql users.pgsql artworks.pgsql collections.pgsql tags.pgsql comments.pgsql

all: $(fnc_files)

tools.pgsql:
	$(PG) -U $(DB)_api -d $(DB) -f $@

users.pgsql:
	$(PG) -U $(DB)_api -d $(DB) -f $@

artworks.pgsql:
	$(PG) -U $(DB)_api -d $(DB) -f $@

collections.pgsql:
	$(PG) -U $(DB)_api -d $(DB) -f $@

tags.pgsql:
	$(PG) -U $(DB)_api -d $(DB) -f $@

comments.pgsql:
	$(PG) -U $(DB)_api -d $(DB) -f $@

.PHONY: all $(fnc_files)
