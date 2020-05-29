var net = require('net');
var listenPort = 8080;
var server = net.createServer(function (socket) {
    console.log('connect: ' + socket.remoteAddress + ':' + socket.remotePort);
    socket.setEncoding('binary');
    socket.on('data', function (data) {
        console.log('client send:' + data);
    });
    socket.write('Hello client!\r\n');
    socket.pipe(socket);
    socket.on('error', function (exception) {
        console.log('socket error:' + exception);
        socket.end();
    });
    socket.on('close', function (data) {
        console.log('client closed!');
        socket.remoteAddress + ' ' + socket.remotePort
    );
});
}).
listen(listenPort);
server.on('listening', function () {
    console.log("server listening:" + server.address().port);
});
server.on("error", function (exception) {
    console.log("server error:" + exception);
});
