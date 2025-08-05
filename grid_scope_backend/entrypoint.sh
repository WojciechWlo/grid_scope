#!/bin/sh

./wait-for-it.sh mssql 1433 --

python manage.py makemigrations

python manage.py migrate

exec "$@"