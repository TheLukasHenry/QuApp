#!/bin/bash

function initialize_db {
    /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "mssql1Ipw" -d master -i /var/opt/mssql/scripts/mainDb.sql
}

# Wait for SQL Server to start up, then run the initialization script.
for i in {1..50};
do
    /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "mssql1Ipw" -d master -Q "SELECT 1;" > /dev/null
    if [ $? -eq 0 ]
    then
        initialize_db
        break
    else
        echo "Waiting for SQL Server to start..."
        sleep 1
    fi
done



