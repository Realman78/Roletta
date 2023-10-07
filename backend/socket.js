const newConnectionHandler = require('./socketHandlers/newConnectionHandler')
const authSocket = require('./middleware/authSocket')

const disconnectHandler = require('./socketHandlers/disconnectHandler')
const socketStore = require('./socketStore')

const roomCreateHandler = require('./socketHandlers/roomCreateHandler')
const roomJoinHandler = require('./socketHandlers/roomJoinHandler')
const roomLeaveHandler = require('./socketHandlers/roomLeaveHandler')
const roomInitializeConnectionHandler = require('./socketHandlers/roomInitializeConnectionHandler')
const roomSignalingDataHandler = require('./socketHandlers/roomSignalingDataHandler')
const notepadChangeHandler = require('./socketHandlers/notepadChangeHandler')
const sendMessageHandler = require('./socketHandlers/sendMessageHandler')
const getRoomDetailsHandler = require('./socketHandlers/getRoomDetailsHandler')
const deleteMessageHandler = require('./socketHandlers/deleteMessageHandler')


const registerSocketServer = server => {
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
            methods: ["GET", "POST"]
        }
    })
    socketStore.setSocketServerInstance(io)
    io.use((socket, next) => {
        authSocket(socket, next)
    })

    io.on('connection', socket => {
        console.log('user connected')
        newConnectionHandler(socket, io)

        socket.on('room-create', (data) => {
            roomCreateHandler(socket, data)
        })
        socket.on('room-join', data => {
            roomJoinHandler(socket, data)
        })
        socket.on('room-leave', data => {
            roomLeaveHandler(socket, data)
        })
        socket.on('conn-init', data => {
            roomInitializeConnectionHandler(socket, data)
        })
        socket.on('conn-signal', data => {
            roomSignalingDataHandler(socket, data)
        })
        socket.on('notepad-content', data => {
            notepadChangeHandler(socket, data)
        })
        socket.on('send-message', data => {
            sendMessageHandler(io, data)
        })
        socket.on('delete-message', data => {
            deleteMessageHandler(socket, data, io)
        })
        socket.on('get-room-details', data => {
            getRoomDetailsHandler(io, data)
        })

        socket.on('disconnect', () => {
            disconnectHandler(socket)
        })
    })
}



module.exports = {
    registerSocketServer
}