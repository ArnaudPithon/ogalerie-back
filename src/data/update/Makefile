SHELL := /usr/bin/env sh
PG := /usr/bin/env psql
DB := ogalerie
DEBUG :=  # -e
maj_files := patch-01.pgsql patch-02.pgsql patch-03.pgsql

all: $(maj_files)

patch-01.pgsql:
	$(PG) -U $(DB)_api -d $(DB) -f $@

patch-02.pgsql:
	$(PG) -U $(DB)_api -d $(DB) -f $@

.PHONY: all $(maj_files)
