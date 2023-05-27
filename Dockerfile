FROM mcr.microsoft.com/mssql/server:2019-latest

COPY --chown=mssql:mssql ./restore-db.sh /var/opt/mssql/scripts/restore-db.sh

RUN chmod +x /var/opt/mssql/scripts/restore-db.sh

ENTRYPOINT [ "/bin/bash", "/var/opt/mssql/scripts/restore-db.sh" ]
