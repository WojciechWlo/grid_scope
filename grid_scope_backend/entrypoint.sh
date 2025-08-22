#!/bin/sh
# entrypoint.sh

./wait-for-it.sh

export RUN_MIGRATIONS=1
python manage.py makemigrations
python manage.py migrate

./drop-token-constraint.sh

python manage.py migrate

./generate-token-constraint.sh

./create-super-user.sh
unset RUN_MIGRATIONS

exec "$@"