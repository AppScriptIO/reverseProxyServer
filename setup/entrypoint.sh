#!/usr/bin/env bash

currentRelativeFilePath=$(dirname "$0")
echo host path: `pwd`/$currentRelativeFilePath
# pwd - current working directory in host machine.
# currentRelativeFilePath - path relative to where shell was executed from.
docker run \
    --volume `pwd`/$currentRelativeFilePath/..:/project/application \
    --volume /var/run/docker.sock:/var/run/docker.sock \
    myuserindocker/deployment-environment:latest \
    containerCommand "$@"
