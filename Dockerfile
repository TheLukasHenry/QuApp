# FROM mcr.microsoft.com/mssql/server:2019-latest

# ENV ACCEPT_EULA=Y
# ENV SA_PASSWORD=mssql1Ipw

# COPY --chown=mssql:mssql ./restore-db.sh /var/opt/mssql/scripts/restore-db.sh

# COPY ./main-2023527-9-43-28.bak /var/opt/mssql/backup/main.bak



# RUN chmod +x /var/opt/mssql/scripts/restore-db.sh

# ENTRYPOINT [ "/bin/bash", "/var/opt/mssql/scripts/restore-db.sh" ]








# SQL SCRIPT TO CREATE DATABASE
FROM mcr.microsoft.com/mssql/server:2019-latest

ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=mssql1Ipw

COPY --chown=mssql:mssql ./entrypoint.sh /var/opt/mssql/scripts/entrypoint.sh

RUN chmod +x /var/opt/mssql/scripts/entrypoint.sh

# CMD [ "/bin/bash" ]
