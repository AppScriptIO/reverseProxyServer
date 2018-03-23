const path = require('path')

let projectPath = '/project',
    applicationPath = path.join(projectPath, 'application'),
    webappGithubProxyModule = require('./webappRepository.js'),
    // letsencryptPort = process.env.LETSENCRYPT_PORT,
    email = process.env.EMAIL,
    proxyFolderPath = path.join(applicationPath, 'data/webappProxyConfig'),
    certificateBaseFolder = path.join(applicationPath, 'certificate', 'live')

module.exports = {
    projectPath, 
    applicationPath,
    // letsencryptPort,
    webappGithubProxyModule,
    email,
    proxyFolderPath,
    certificateBaseFolder
}