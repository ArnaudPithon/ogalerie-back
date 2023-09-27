SHELL := /usr/bin/env sh
PG := /usr/bin/env psql
DB := ogalerie
DEBUG :=  # -e

all: database tables functions populate

drop_database:
	dropdb $(DEBUG) -U postgres --if-exists $(DB)

drop_users: drop_database
	dropuser $(DEBUG) -U postgres --if-exists $(DB)_admin
	dropuser $(DEBUG) -U postgres --if-exists $(DB)_api

users: drop_users
	createuser $(DEBUG) -U postgres --no-login $(DB)_admin
	createuser $(DEBUG) -U postgres --login --pwprompt -g $(DB)_admin --no-inherit $(DB)_api

database: drop_database users
	createdb $(DEBUG) -U postgres -O $(DB)_admin $(DB)

tables: create_tables.pgsql
	$(PG) -U $(DB)_api -d $(DB) -f $<

functions: functions.pgsql
	$(PG) -U $(DB)_api -d $(DB) -f $<

populate: seeding.pgsql
	$(PG) -U $(DB)_api -d $(DB) -f $<

.PHONY: all drop_users drop_database users database tables functions populate
