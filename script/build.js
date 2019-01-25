const { execSync, spawn, spawnSync } = require('child_process')
import path from 'path'
import assert from 'assert'
import configuration from '../configuration/configuration.js'
const applicationPath = path.join(configuration.projectPath, 'application')

// extract variables with pattern "<key>=<value>"
let namedArg = {}
let delimiter = '='
for (let arg of process.argv) {
    if (arg.indexOf(delimiter) > -1) {
        let index = arg.indexOf(delimiter)
        let key = arg.slice(0, index).trim()
        let value = arg.slice(index + 1, arg.length).trim()
        namedArg[key] = value
    }
}

// 1. Install node_modules first.

// 2. Build image.
assert.notStrictEqual(namedArg.EMAIL, undefined, 'EMAIL argument must exist.')
spawnSync('docker-compose', [
    "-f ./setup/container/deployment.dockerCompose.yml",
    "build --no-cache proxy"
], {
    cwd: applicationPath, 
    shell: true, 
    stdio: [0,1,2], 
    env: {
        LETSENCRYPT_PORT: 3000, // redbird's letsencrypt was used for AMCE protocol v1, which doesn't support letsencrypt DNS wildcard (ACME v2)
        EMAIL: namedArg.EMAIL
    }
})
