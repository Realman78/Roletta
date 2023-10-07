const serverStore = require('../socketStore')
const roomUpdates = require('./updates/rooms')

const getRoomDetailsHandler = (io, data)=>{
    const room = serverStore.getActiveRoom(data)

    if (room && room.participants){
        room.participants.forEach(p=>{
            io.to(p.socketId).emit('get-room-details',  room)
        })
    }
}

module.exports = getRoomDetailsHandler