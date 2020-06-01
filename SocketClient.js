// 1 引入模块
const net = require('net');
const dev = require('./DEV')
const fs = require('fs')
const path = require('path')

function getIP(result) {
    require('dns').lookup(require('os').hostname(), function (err, add, fam) {
        console.log('addr: ' + add);
        result(add)
    })
    // const ifaces = os.networkInterfaces();
    //
    // Object.keys(ifaces).forEach(function (ifname) {
    //     let alias = 0;
    //
    //     ifaces[ifname].forEach(function (iface) {
    //         if ('IPv4' !== iface.family || iface.internal !== false) {
    //             // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
    //             return;
    //         }
    //
    //         if (alias >= 1) {
    //             // this single interface has multiple ipv4 addresses
    //             console.log(ifname + ':' + alias, iface.address);
    //         } else {
    //             // this interface has only one ipv4 adress
    //             console.log(ifname, iface.address);
    //         }
    //         ++alias;
    //     });
    // });
}

function latestFileName() {
    const files = fs.readdirSync(dev.PATH_DIR);
    console.log('ls files...');
    return files.reduce((last, current) => {

        let currentFileDate = new Date(fs.statSync(path.join(dev.PATH_DIR, current)).mtime);
        let lastFileDate = new Date(fs.statSync(path.join(dev.PATH_DIR, last)).mtime);

        return (currentFileDate.getTime() > lastFileDate.getTime()) ? current : last;
    });
}

function connectServer() {
    let client = new net.Socket();
    client.connect(dev.SERVER_SOCKET_PORT, dev.SERVER_HOST, function () {
        console.log('connect server success!');
    });

    client.setEncoding('utf8');
    client.on('data', (data) => {
        console.log('from server:' + data);
        getIP(function (result) {
            client.write(JSON.stringify('filedir' === data ? {
                ip: result,
                port: dev.CLIENT_FILE_PORT
            } : {
                latestFilePath: result + ':' + dev.CLIENT_FILE_PORT + '/' + latestFileName()
            }));
        })
    });
    client.on('error', (e) => {
        console.log(e.message);
    });
    client.on('close', function () {
        //正常关闭连接
        console.log('Connection closed');
        setTimeout(function () {
            console.log('reconnecting...');
            connectServer()
        }, dev.SOCKET_RECONNECT_DELAY)
    });
}

module.exports = {
    getIP, connectServer
}
// getIP()
// latestFileName()