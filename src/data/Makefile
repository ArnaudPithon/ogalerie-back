SHELL := /usr/bin/env sh
PG := /usr/bin/env psql
DB := ogalerie
DEBUG :=  # -e

all: database tables functions populate

drop_database:
	sudo -u postgres dropdb $(DEBUG) -U postgres --if-exists $(DB)

drop_users: drop_database
	sudo -u postgres dropuser $(DEBUG) -U postgres --if-exists $(DB)_admin
	sudo -u postgres dropuser $(DEBUG) -U postgres --if-exists $(DB)_api

users: drop_users
	sudo -u postgres createuser $(DEBUG) -U postgres --no-login $(DB)_admin
	sudo -u postgres createuser $(DEBUG) -U postgres --login --pwprompt -g $(DB)_admin --no-inherit $(DB)_api

database: drop_database users
	sudo -u postgres createdb $(DEBUG) -U postgres -O $(DB)_admin $(DB)

tables: create_tables.pgsql
	$(PG) -W -U $(DB)_api -d $(DB) -f $<

functions:
	make -C functions

populate: seeding.pgsql
	$(PG) -W -U $(DB)_api -d $(DB) -f $<

.PHONY: all drop_users drop_database users database tables functions populate
