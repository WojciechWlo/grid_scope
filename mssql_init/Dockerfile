FROM mcr.microsoft.com/mssql/server:2019-CU13-ubuntu-20.04

USER root

RUN apt-get update && \
    apt-get install -y apt-transport-https ca-certificates curl gnupg netcat

COPY init.sh /init.sh
RUN chmod +x /init.sh