// This file would be required in Redbird reverseProxy. 
// USAGE: 

module.exports = function reverseProxy() {

    let domain = 'dentrist.com'
    let containerGroupName = 'dentristwebapp'

    // TODO: Fix cross origin http in https, seems as if `upgrade` header doesn't work well in apache config wiht browser throgh http config file.
    let proxyConfig = [
        {
            domain: domain,
            containerRoute: `http://${containerGroupName}_wordpress:80`,
            ssl: true            
        },
    ]

    return proxyConfig

}
