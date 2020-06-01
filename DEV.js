const DEV = false
const PATH_DIR = 'C:\\android\\trunk\\apk_build\\debug'
const SERVER_SOCKET_PORT = 3365
const CLIENT_FILE_PORT = 3366
const SERVER_HOST = DEV ? '127.0.0.1' : 'iakira.moe'
const SOCKET_RECONNECT_DELAY = 1500

module.exports = {
    PATH_DIR, SERVER_SOCKET_PORT, CLIENT_FILE_PORT, SERVER_HOST, SOCKET_RECONNECT_DELAY
};