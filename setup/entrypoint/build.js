

    export EMAIL=<...>
    export LETSENCRYPT_PORT=3000 

    # 1. install node_modules.

    # Build image
    docker-compose -f ./setup/container/deployment.dockerCompose.yml build --no-cache proxy
