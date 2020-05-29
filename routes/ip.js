var express = require('express');
var router = express.Router();
var socketServer = require('../SocketServer');
socketServer.startServer();
/* GET users listing. */
router.get('/', function (req, res, next) {
    socketServer.pullClientAddress(function (data) {
        res.send(data)
    })
});

module.exports = router;
