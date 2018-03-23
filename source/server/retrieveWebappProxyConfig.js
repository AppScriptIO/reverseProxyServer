const path = require('path')
let filesystem = require('fs');
let filesystemPromise = require('fs-promise'); // supports "fs-extra" functionality.
let childProcessPromise = require('child-process-promise');
const config = require('../../setup/configuration/configuration.js')

module.exports = function retrieveWebappProxyConfig() {
    return new Promise(async function(resolve, reject) {
        try {

            // Ensure folder exists
            if (!filesystem.existsSync(config.proxyFolderPath)) filesystem.mkdirSync(config.proxyFolderPath) // create directory if doesn't exist.
            await filesystemPromise.ensureDir(config.proxyFolderPath) // directory should be present

            // Download webapp proxy configuration
            await downloadWebappConfig({ 
                fileConfigArray: config.webappGithubProxyModule,
                downloadPath: config.proxyFolderPath
            })
            
            resolve()

        } catch (error) {
            reject(error)
        }

    })
}

function downloadWebappConfig({ fileConfigArray, downloadPath }) {

    // retrieve proxy configuration for each project.
    let promiseArray = []    
    fileConfigArray.map((file, i) => {
        let repositoryURL = file.url, 
            createdFilePath = path.join(downloadPath, file.name)
        console.log(`• Downloading raw data from ${repositoryURL}.\n`)
        let promise = childProcessPromise.exec(`curl -o ${createdFilePath} ${repositoryURL}`)
        promiseArray.push(promise)
    })
    return Promise.all(promiseArray)          
    
}