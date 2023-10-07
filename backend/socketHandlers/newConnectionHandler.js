const serverStore = require('../socketStore')
const roomUpdates = require('./updates/rooms.js')

const newConnectionHandler = async (socket, io)=>{
    const userId = socket.user
    serverStore.addNewConnectedUser({
        socketId: socket.id,
        userId
    })

    setTimeout(()=>{
        roomUpdates.updateRooms(socket.id)
    }, 500)
}

module.exports = newConnectionHandler