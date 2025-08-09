#!/bin/sh

./wait-for-it.sh mssql 1433


python manage.py makemigrations

python manage.py migrate

./drop-token-constraint.sh

python manage.py migrate

./generate-token-constraint.sh

./create-super-user.sh

exec "$@"