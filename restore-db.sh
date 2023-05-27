#!/bin/bash

# Start SQL Server
/opt/mssql/bin/sqlservr &

# Wait for SQL Server to start
sleep 30s

# Restore the database
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "mssql1Ipw" -Q "RESTORE DATABASE main FROM DISK = '/var/opt/mssql/data/main-2023527-9-43-28.bak' WITH MOVE 'main' TO '/var/opt/mssql/data/main.mdf', MOVE 'main_log' TO '/var/opt/mssql/data/main_log.ldf'"

# Keep the container running
tail -f /dev/null
