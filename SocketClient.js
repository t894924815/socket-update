// 1 引入模块
const net = require('net');

function connectServer() {
    let client = new net.Socket();
    client.connect(800, 'localhost', function () {
        console.log('connect server success!');
    });

    client.setEncoding('utf8');
    client.on('data', (data) => {
        console.log('from server:' + data);
        client.write("http://192.168.2.62:33651");
    });
    client.on('error', (e) => {
        console.log(e.message);
    });
    client.on('close', function () {
        //正常关闭连接
        console.log('Connection closed');
        setTimeout(function () {
            console.log('re connecting...');
            connectServer()
        }, 1000)
    });
}

connectServer();
