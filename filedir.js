const handler = require('serve-handler');
const http = require('http');
const socketClient = require('./SocketClient')
const dev = require('./DEV')

const server = http.createServer((request, response) => {
    // You pass two more arguments for config and middleware
    // More details here: https://github.com/zeit/serve-handler#options
    return handler(request, response, {
        'public': dev.PATH_DIR
    });
})
socketClient.connectServer()
server.listen(dev.CLIENT_FILE_PORT, () => {
    socketClient.getIP(ip => {
        console.log('Running at http://' + ip + ':' + dev.CLIENT_FILE_PORT);
    })
});