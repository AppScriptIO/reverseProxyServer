FROM node:latest
# RUN apt-get update -y; apt-get upgrade -y;

ARG PROJECT="/project/application"

ENV EMAIL ${EMAIL}
ENV LETSENCRYPT_PORT ${LETSENCRYPT_PORT}

COPY ./source/server $PROJECT/server

WORKDIR $PROJECT/server
ENTRYPOINT ./entrypoint.sh run