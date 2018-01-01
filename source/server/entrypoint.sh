#!/bin/bash
set -ex; 
echo "Deploying as ${DEPLOYMENT}";

run() {
    node ./proxy.js;
}

# ⭐ call docker-compose command after entrypoint as they are passed as arguments when entrypoint is set.
$@
