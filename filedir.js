const handler = require('serve-handler');
const http = require('http');
const https = require('https');
const socketClient = require('./SocketClient')
const dev = require('./DEV')
let fs = require("fs");


const server = http.createServer(/*{
    key: fs.readFileSync("/Users/jaybor/Desktop/auth-pair/server.key"),
    cert: fs.readFileSync("/Users/jaybor/Desktop/auth-pair/server.csr")
},*/(request, response) => {
    // You pass two more arguments for config and middleware
    // More details here: https://github.com/zeit/serve-handler#options
    return handler(request, response, {
        'public': dev.PATH_DIR,
        "unlisted": [
            ".DS_Store",
            ".git"
        ]
    });
})
socketClient.connectServer()
server.listen(dev.CLIENT_FILE_PORT, () => {
    socketClient.getIP(ip => {
        console.log('Running at http://' + ip + ':' + dev.CLIENT_FILE_PORT);
    })
});
