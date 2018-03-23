/* Let's Encrypt shell */
// TODO: use this entrypoint instead of shell entrypoint, and merge docker containers for letsencypt and proxy.

const { execSync, spawn, spawnSync } = require('child_process')

module.exports = function () {

    let email = process.env.EMAIL
    let environmentVariable = {}

    let processCommand = 'certbot',
    processCommandArgs = [
        `certonly`,
        `--agree-tos -n`, // Agree to terms & use non interative execution.
        `--test-cert`,
        `--dns-google `, // type of plugin
        `-m ${email}`,
        `-d taleb.io` // domains
    ],
    processOption = {
        // cwd: `${applicationPath}`, 
        shell: true, 
        stdio: [0,1,2], 
        env: environmentVariable
    }
    let childProcess = spawn(processCommand, processCommandArgs, processOption)
    childProcess.on('uncaughtException', function(e) { throw e })
    
}