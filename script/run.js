const { execSync, spawn, spawnSync } = require('child_process')
import path from 'path'
import configuration from '../configuration/configuration.js'
console.log(process.argv)
const applicationPath = path.join(configuration.projectPath, 'application')

switch (process.argv[0]) {
    case 'production':
        /* Production proxy & certbot */
        // Issue Case: Docker Swarm not exposing ports to host. The reason for that is a VM reset, stop&start, or docker engine upgrade. In these cases the routing mesh of docker swarm gets messed up for some reason.
        // Solution - leave swarm and rejoin or recreate swarm. 
        
        // 1. add necessary ports
        // export LETSENCRYPT_PORT=3000 
        // gcloud compute firewall-rules create redbird-proxy --allow tcp:$LETSENCRYPT_PORT --description "allow3000usedforletsencrypt" --target-tags docker-machine
        
        // 2. Production
        // VolumePath=/mnt/datadisk-1/redbirdProxy/server
        // sudo mkdir -p $VolumePath;
        // VolumePath=/mnt/datadisk-1/redbirdProxy/certificate
        // sudo mkdir -p $VolumePath;
        
        // 3. Export email address used for reverse proxy certificate registration with let's encrypt
        // export EMAIL=<...>
        // export LETSENCRYPT_PORT=3000
        // docker network create --driver overlay proxy
        // 4. 
        // docker stack deploy -c ./setup/container/production.dockerStack.yml proxy
        
        // FOR CERTBOT CHECK YML FILE.
    break;
    case 'development':
    default:
        let containerPrefix = 'proxy',
            serviceName = 'development',
            ymlFile = './setup/container/deployment.dockerCompose.yml',
            appEntrypointPath = `${configuration.applicationPath}/source/server/entrypoint.js`,
            containerCommand = (process.argv.includes('sleep')) ? `sleep 1000000` : `node ${appEntrypointPath}`,
            environmentVariable = {
                DEPLOYMENT: "development",
                hostPath: process.env.hostPath
            }

        // Run docker application container using yml configuration file.
        let processCommand = 'docker-compose',
            processCommandArgs = [
                `-f ${ymlFile}`,
                `--project-name ${containerPrefix}`,
                `run --service-ports`, // --service-ports is required when using run command, it allows mapping of ports to host as set in yml file.
                `--entrypoint '${containerCommand}'`,
                `${serviceName}`
            ],
            processOption = {
                cwd: applicationPath, 
                shell: true, 
                stdio: [0,1,2], 
                env: environmentVariable
            }
        spawnSync(processCommand, processCommandArgs, processOption)

        // spawnSync('docker-compose', [
        //     "-f ./setup/container/deployment.dockerCompose.yml up -d --force-recreate development"
        // ], { cwd: applicationPath, shell: true, stdio:[0,1,2] })
        
    break;
}
