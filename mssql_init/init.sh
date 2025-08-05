#!/bin/bash
set -e

echo "Waiting for MSSQL to be available..."

until nc -z mssql 1433; do
  echo "Waiting for MSSQL port 1433..."
  sleep 1
done

echo "MSSQL is up, running initdb.sql..."

# Run the SQL script
/opt/mssql-tools/bin/sqlcmd -S mssql -U SA -P "$SA_PASSWORD" -i /initdb.sql

echo "Database initialization finished."