SHELL := /usr/bin/env sh
PG := /usr/bin/env psql
DB := ogalerie
DEBUG :=  # -e
fnc_files := users.pgsql artworks.pgsql collections.pgsql

all: users.pgsql artworks.pgsql collections.pgsql

users.pgsql:
	$(PG) -U $(DB)_api -d $(DB) -f $@

artworks.pgsql:
	$(PG) -U $(DB)_api -d $(DB) -f $@

collections.pgsql:
	$(PG) -U $(DB)_api -d $(DB) -f $@

.PHONY: all users.pgsql artworks.pgsql collections.pgsql
