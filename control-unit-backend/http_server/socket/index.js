const { Server, Socket } = require("socket.io")

/**
 * @type {Socket|undefined}
 */
let io = undefined

const initSocket = (server) =>
{
    return new Promise((resolve, reject) =>
    {
        io = new Server(server)
        resolve()
    })
}

const ensureSocket = () =>
{
    if(io === undefined) throw new Error("socket not initialized")
}

const send = (channel, data) =>
{
    ensureSocket()   
    io.emit(channel, JSON.stringify(data))
}

module.exports = {
    initSocket,
    ensureSocket,
    send
}