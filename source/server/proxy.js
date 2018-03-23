const path = require('path') 
const filesystem = require('fs')
const redbird = require('redbird')
const config = require('../../setup/configuration/configuration.js')
const retrieveWebappProxyConfig = require('./retrieveWebappProxyConfig.js')

module.exports = function () {

    // Setup global Redbird configuration.
    const proxy = redbird({
        port: 80,
        xfwd: true, 
        // letsencrypt: {
        //     port: letsencryptPort, 
        //     path: certificateBaseFolder
        // },
        ssl: { // Optional SSL proxying.
            port: 443, // SSL port the proxy will listen to.
            // // Default certificates
            // key: keyPath,
            // cert: certPath,
            // ca: caPath // Optional.
            redirect: true // Disable HTTPS autoredirect to this route.
        }
    });

    // will be called when a proxy route is not found.
    proxy.notFound((req, res) => { 
        res.statusCode = 404;
        res.write('Oops.. No app found to handle your request.');
        res.end();
    })

    // Downlaod and execute each webapp proxy configuration.
    retrieveWebappProxyConfig()
        .then(function() {
            // Execute webapp proxy configuration
            filesystem.readdirSync(config.proxyFolderPath).forEach(function(file) {
                if(file.substr(file.lastIndexOf('.') + 1)) { // Ensure file is being read
                    let filePath = path.join(config.proxyFolderPath, file)
                    let func;
                    try {
                        func = require(filePath)
                    } catch (error) {
                        throw error
                    }
                    console.log(`\n\n\n\n• Adding ${filePath} to proxy.`)
                    console.log(func)
                    let proxyConfigArray = func() // initialize proxy configuration with the current running proxy app.
                    proxyConfigArray.forEach(function(proxyConfig) {
                        registerProxyConfig(proxyConfig)
                    })
                }
            })
        })
    
    function registerProxyConfig(proxyConfig) {
        if(proxyConfig.ssl) { // HTTPS
            let hostname = (proxyConfig.subdomain) ? `${proxyConfig.subdomain}.${proxyConfig.domain}` : proxyConfig.domain;
            let certificateFolder = path.join(config.certificateBaseFolder, proxyConfig.domain)
            proxy.register(
                hostname,
                proxyConfig.containerRoute,
                {
                    ssl: { // all wildcard certificates are saved under the main domain folder.
                        // ca: path.join( certificateFolder, 'chain.pem'), // certificate authority - or served separately.
                        key: path.join( certificateFolder, 'privkey.pem'), // private key
                        cert: path.join( certificateFolder, 'fullchain.pem') // public key - the public certificate should be combination of cert+chain i.e. "cat cert.pem chain.pem > fullchain.pem"
                    }
                }
            )
        } else { // HTTP
            let hostname = (proxyConfig.subdomain) ? `${proxyConfig.subdomain}.${proxyConfig.domain}` : proxyConfig.domain;
            proxy.register(
                hostname, 
                proxyConfig.containerRoute
            )
        }
    }

}

// _____________________________________________________________________________
// Using express with redbird - https://github.com/OptimalBits/redbird/issues/83

// var express  = require('express');
// var app      = express();
// var httpProxy = require('http-proxy');
// var apiProxy = httpProxy.createProxyServer();
// var serverOne = 'http://google.com',
//     ServerTwo = 'http://yahoo.com',
//     ServerThree = 'http://example.com';
 
// app.all("/app1/*", function(req, res) {
//     console.log('redirecting to Server1');
//     apiProxy.web(req, res, {target: serverOne});
// });

// app.all("/app2/*", function(req, res) {
//     console.log('redirecting to Server2');
//     apiProxy.web(req, res, {target: ServerTwo});
// });

// app.all("/app2/*", function(req, res) {
//     console.log('redirecting to Server3');
//     apiProxy.web(req, res, {target: ServerThree});
// });

// app.listen(80);
