#!/usr/bin/env bash
# wait-for-it.sh

set -e

# Wait for the MSSQL server to be ready
until nc -z "$DB_HOST" "$DB_PORT"; do
  echo "Waiting for $DB_HOST:$DB_PORT..."
  sleep 1
done

# Wait until the database is created
until sqlcmd -S "$DB_HOST,$DB_PORT" -U "$DB_USER" -P "$DB_PASSWORD" -N -C -Q "SELECT name FROM sys.databases WHERE name = '$DB_NAME'" | grep -q "$DB_NAME"; do
  echo "Waiting for database '$DB_NAME' to be created..."
  sleep 2
done

echo "Database '$DB_NAME' is ready!"