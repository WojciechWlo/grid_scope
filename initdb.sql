IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'grid_scope_db')
BEGIN
    CREATE DATABASE grid_scope_db;
END
GO

USE grid_scope_db;
GO

IF NOT EXISTS (SELECT name FROM sys.sql_logins WHERE name = N'tech_user')
BEGIN
    CREATE LOGIN tech_user WITH PASSWORD = 'tech_password123!';
END
GO

IF NOT EXISTS (SELECT name FROM sys.database_principals WHERE name = N'tech_user')
BEGIN
    CREATE USER tech_user FOR LOGIN tech_user;
END
GO

ALTER ROLE db_datareader ADD MEMBER tech_user;
ALTER ROLE db_datawriter ADD MEMBER tech_user;
GO

IF NOT EXISTS (SELECT * FROM sys.sql_logins WHERE name = 'temp_user')
BEGIN
    CREATE LOGIN TEMP_USER WITH PASSWORD = 'temp_password123!';
END
GO

IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'temp_user')
BEGIN
    CREATE USER TEMP_USER FOR LOGIN TEMP_USER;
END
GO