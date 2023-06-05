# SQL SCRIPT TO CREATE DATABASE
FROM mcr.microsoft.com/mssql/server:2019-latest

ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=mssql1Ipw

COPY --chown=mssql:mssql ./entrypoint.sh /var/opt/mssql/scripts/entrypoint.sh

RUN chmod +x /var/opt/mssql/scripts/entrypoint.sh

# CMD [ "/bin/bash" ]
