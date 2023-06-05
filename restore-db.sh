# #!/bin/bash


# # Start SQL Server
# /opt/mssql/bin/sqlservr &

# # Wait for SQL Server to start
# sleep 30s

# # Restore the database
# # /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P 'mssql1Ipw' -Q "RESTORE DATABASE [main] FROM  DISK = N'/var/opt/mssql/backup/main.bak' WITH  FILE = 1,  NOUNLOAD,  REPLACE,  STATS = 5"

# /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P 'mssql1Ipw' -Q "RESTORE DATABASE [main] FROM  DISK = N'/var/opt/mssql/backup/main.bak' WITH  FILE = 1,  MOVE 'main' TO '/var/opt/mssql/data/main.mdf', MOVE 'main_log' TO '/var/opt/mssql/data/main_log.ldf', NOUNLOAD,  REPLACE,  STATS = 5"


# # Keep the container running
# tail -f /dev/null
