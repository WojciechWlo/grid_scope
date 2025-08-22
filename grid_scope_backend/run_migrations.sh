#!/bin/bash
# run_migrations.sh
# Run Django migrations using SA user

set -e   # stop on first error

echo "Running Django migrations as SA..."

export RUN_MIGRATIONS=1
python manage.py makemigrations
python manage.py migrate
unset RUN_MIGRATIONS

echo "Migrations completed."