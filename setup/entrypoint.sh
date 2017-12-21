#!/usr/bin/env bash

currentRelativeFilePath=$(dirname "$0")

if [[ $# -eq 0 ]] ; then # if no arguments supplied, fallback to default
    entrypointOption="run"
else
    entrypointOption=$1
fi;

# pwd - current working directory in host machine.
# currentRelativeFilePath - path relative to where shell was executed from.
# TODO: Remove "containerManager" environment variable as it must be a default set in the dockerfile and accessable after build.
docker run \
    --volume `pwd`/$currentRelativeFilePath/..:/project/application \
    --env entrypointOption=$entrypointOption \
    myuserindocker/deployment-environment:latest \
    sleep 10000 
    # ls /project/application/setup/entrypoint/
