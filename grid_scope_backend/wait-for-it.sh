#!/usr/bin/env bash
# wait-for-it.sh

set -e

host="$1"
shift
port="$1"
shift

# Poczekaj aż port będzie otwarty
until nc -z "$host" "$port"; do
  echo "Waiting for $host:$port..."
  sleep 1
done

# Poczekaj aż baza danych grid_scope_db będzie utworzona
until sqlcmd -S mssql -U sa -P YourStrong!Passw0rd -N -C -Q "SELECT name FROM sys.databases WHERE name = 'grid_scope_db'" | grep -q grid_scope_db; do
  echo "Waiting for database 'grid_scope_db' to be created..."
  sleep 2
done

exec "$@"