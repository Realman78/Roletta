const serverStore = require('../socketStore')
const roomLeaveHandler = require('./roomLeaveHandler')

const disconnectHandler = socket=>{
    const activeRooms = serverStore.getActiveRooms()

    activeRooms.forEach(room => {
        const userInRoom = room.participants.some(participant => participant.socketId === socket.id)
        if (userInRoom){
            roomLeaveHandler(socket, {roomId: room.roomId})
        }
    })
    serverStore.removeConnectedUser(socket.id)
}

module.exports = disconnectHandler