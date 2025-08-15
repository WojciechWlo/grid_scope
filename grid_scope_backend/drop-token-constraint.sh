#!/bin/sh
# drop-token-constraint.sh

echo "Drop token constraint..."

# Execute the SQL code on the MSSQL server
sqlcmd -S "$DB_HOST,$DB_PORT" -U "$DB_USER" -P "$DB_PASSWORD" -d "$DB_NAME" -N -C <<EOF
USE grid_scope_db;

DECLARE @ConstraintName NVARCHAR(255);
DECLARE @sql NVARCHAR(MAX);

DECLARE cur CURSOR FOR
SELECT name FROM sys.objects WHERE name LIKE 'UQ__token_bl%';

OPEN cur;
FETCH NEXT FROM cur INTO @ConstraintName;

WHILE @@FETCH_STATUS = 0
BEGIN
    PRINT 'Dropping constraint: ' + @ConstraintName;
    SET @sql = N'ALTER TABLE dbo.token_blacklist_blacklistedtoken DROP CONSTRAINT ' + QUOTENAME(@ConstraintName) + ';';
    EXEC sp_executesql @sql;
    FETCH NEXT FROM cur INTO @ConstraintName;
END

CLOSE cur;
DEALLOCATE cur;

GO
EOF