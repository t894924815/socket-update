const net = require('net');
let clientInstance;

function startServer() {
    const server = net.createServer(function (socket) {
        console.log('connect: ' +
            socket.remoteAddress + ':' + socket.remotePort);
        socket.setEncoding('binary');

        socket.on('error', function (exception) {
            console.log('socket error:' + exception);
            socket.end();
        });
        socket.on('close', function (data) {
            console.log('client closed!');
        });
        clientInstance = socket
    });
    server.on('listening', function () {
        console.log("server listening:" + server.address().port);
    });
    server.on("error", function (exception) {
        console.log("server error:" + exception);
    });
    server.listen(800);
}

function pullClientAddress(callback) {
    clientInstance.on('data', function (data) {
        console.log('client send:' + data);
        callback('data')
    });
    clientInstance.write('update');
}

module.exports = {
    startServer, pullClientAddress
};
