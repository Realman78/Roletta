const serverStore = require('../socketStore')
const roomUpdates = require('./updates/rooms.js')

const sendMessageHandler = async (io, data) => {
    const room = serverStore.updateChatMessages(data)

    if (room && room.participants){
        room.participants.forEach(p=>{
            io.to(p.socketId).emit('send-message',  room.chatMessages)
        })
    }
    roomUpdates.updateRooms()
}

module.exports = sendMessageHandler