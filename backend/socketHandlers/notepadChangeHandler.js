const serverStore = require('../socketStore')
const roomUpdates = require('./updates/rooms.js')

const notepadChangeHandler = async (socket, data) => {
    const room = serverStore.updateSharedNotepad(data)
    if (room && room.participants){
        room.participants.forEach(p=>{
            if (p.socketId === socket.id) return
            socket.to(p.socketId).emit('notepad-content',  room.sharedNotepadContent)
        })
    }
    roomUpdates.updateRooms()
}

module.exports = notepadChangeHandler