const {SerialPort} = require('serialport');

// Du a serial port library bug reported in some issue on GitHub sometimes is necessary wait some second for writing something, and this value seems to be good enough
const CONN_OPEN_TYPE = 1700

const getPort = (path, baudRate) => {
    return new Promise((resolve, reject) => {
        const port = new SerialPort({
            path:path,
            baudRate:baudRate,
            autoOpen:false,
        })
        port.open(() => {
            setTimeout(() => resolve(port), CONN_OPEN_TYPE)
        })
    })
}

const sendMessage = (port, message) => {
    return new Promise((resolve, reject) => {
        port.write(message, function(err) {
            if (err){
                reject(err);
            }
            resolve();
        })
    })
}

const listen = (port, onMessage) => {
    let currentBuffer = ""
    let timeOutRef = undefined
    const TIMEOUT = 10;
    port.on('readable', function () {
        const received = port.read()
        currentBuffer += received
        const now = Date.now()
        clearTimeout(timeOutRef)
        timeOutRef = setTimeout(function () {
            currentBuffer.split("\n").forEach(line => {
                line.trim() !== "" && onMessage(line);
            })
        }, TIMEOUT);
    })
}

module.exports = {
    getPort, sendMessage, listen
}