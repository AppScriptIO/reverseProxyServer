#!/usr/bin/env bash

# USAGE EXAMPLE - ./entrypoint.sh build EMAIL=x LETSENCRYPT_PORT=x

# pwd - current working directory in host machine.
# currentRelativeFilePath - path relative to where shell was executed from.
currentRelativeFilePath=$(dirname "$0")
applicationHostPath="`pwd`/$currentRelativeFilePath/../"
echo host path: $applicationHostPath

# myuserindocker/deployment-environment - version 2.9
docker run \
    --volume $applicationHostPath:/project/application \
    --volume /var/run/docker.sock:/var/run/docker.sock \
    --env "hostPath=$applicationHostPath" \
    myuserindocker/container-manager:latest \
    containerCommand "$@"
