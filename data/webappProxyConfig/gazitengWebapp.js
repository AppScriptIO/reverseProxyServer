// This file would be required in Redbird reverseProxy. 
// USAGE: 

module.exports = function reverseProxy() {

    let domain = 'gaziteng.com'
    let containerGroupName = 'gazitengwebapp'

    let proxyConfig = [
        {
            domain: domain,
            containerRoute: `http://${containerGroupName}_nodejs:80`,
            ssl: true            
        },
        {
            domain: `${domain}`,
            subdomain: `api`,
            containerRoute: `http://${containerGroupName}_nodejs:8082`,
            ssl: true
        },
        {
            domain: `${domain}`,
            subdomain: `cdn`,
            containerRoute: `http://${containerGroupName}_nodejs:8081`,
            ssl: true
        },
        {
            domain: `${domain}`,
            subdomain: `oauth`,
            containerRoute: `http://${containerGroupName}_nodejs:8088`,
            ssl: true
        },
        {
            domain: `${domain}`,
            subdomain: `rethinkdb`,
            containerRoute: `http://${containerGroupName}_nodejs:8080`,
            ssl: false
        },
    ]

    return proxyConfig

}
