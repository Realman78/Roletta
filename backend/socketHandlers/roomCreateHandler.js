const serverStore = require('../socketStore')
const roomUpdates = require('./updates/rooms')

const roomCreateHandler = (socket, data)=>{
    const {name, roomName, roomCode} = data
    const socketId = socket.id
    const userId = socket.user
    const roomDetails = serverStore.addNewActiveRoom(userId, socketId, name, roomName, roomCode)

    socket.emit('room-create', {
        roomDetails
    })

    roomUpdates.updateRooms()
    socket.broadcast.emit('wait-resolve', roomCode)
}

module.exports = roomCreateHandler