const serverStore = require('../socketStore')
const roomUpdates = require('./updates/rooms.js')

const sendMessageHandler = async (socket, data, io) => {
    const room = serverStore.deleteChatMessage(data)

    if (room && room.participants){
        room.participants.forEach(p=>{
            io.to(p.socketId).emit('send-message',  room.chatMessages)
        })
    }
    roomUpdates.updateRooms()
}

module.exports = sendMessageHandler