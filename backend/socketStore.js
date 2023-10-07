const {v4:uuidv4} = require('uuid')
const {deleteScheduledRoom} = require('./controllers/room/roomController')

const connectedUsers = new Map()
let activeRooms = []

let io = null

const setSocketServerInstance = (ioInstance)=>{
    io = ioInstance
}

const getSocketServerInstance = ()=>{
    return io
}

const addNewConnectedUser = ({socketId, userId})=>{
    connectedUsers.set(socketId, {userId})
    console.log(connectedUsers)
}

const removeConnectedUser = socketId=>{
    if (connectedUsers.has(socketId)){
        connectedUsers.delete(socketId)
        console.log('user deleted')
    }
}

function randomizer(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

//rooms
const addNewActiveRoom = (userId, socketId, name, roomName, roomCode) => {
    const _roomCode = roomCode || randomizer(8)
    const newActiveRoom = {
        roomCreator: {
            userId,
            socketId,
            name
        },
        participants: [
            {
                userId,
                socketId,
                name
            }
        ],
        roomId: uuidv4(),
        roomCode: _roomCode,
        roomName,
        sharedNotepadContent: '',
        chatMessages: []
    }
    activeRooms = [...activeRooms, newActiveRoom]
    return newActiveRoom
}

const getActiveRooms = ()=>{
    return [...activeRooms]
}

const getActiveRoom = (id)=>{
    const activeRoom = activeRooms.find(activeRoom => activeRoom.roomId===id)
    if (!activeRoom) return null
    return {
        ...activeRoom
    }
}

const updateSharedNotepad = ({roomId, sharedNotepadContent}) => {
    const room = activeRooms.find(room => room.roomId===roomId)
    activeRooms = activeRooms.filter(r=>r.roomId !== roomId)

    const updatedRoom = {
        ...room,
        sharedNotepadContent
    }

    
    activeRooms.push(updatedRoom)
    return updatedRoom
}

const updateChatMessages = ({roomId, username, userId, textareaContent}) => {
    const room = activeRooms.find(room => room.roomId===roomId)
    activeRooms = activeRooms.filter(r=>r.roomId !== roomId)
    const newChatMessage = {
        senderName: username,
        userId,
        content: textareaContent,
        id: uuidv4(),
    }

    if (!room) return null

    const updatedRoom = {
        ...room,
        chatMessages: [...room.chatMessages, newChatMessage]
    }

    
    activeRooms.push(updatedRoom)
    return updatedRoom
}
const deleteChatMessage = ({roomId,messageId}) => {
    const room = activeRooms.find(room => room.roomId===roomId)
    activeRooms = activeRooms.filter(r=>r.roomId !== roomId)
    const newChatMessages = room.chatMessages.filter((message)=>message.id !== messageId)

    const updatedRoom = {
        ...room,
        chatMessages: newChatMessages
    }

    
    activeRooms.push(updatedRoom)
    return updatedRoom
}

const joinActiveRoom = (roomId, newParticipant) =>{
    const room = activeRooms.find(room => room.roomId===roomId)
    activeRooms = activeRooms.filter(r=>r.roomId !== roomId)

    const updatedRoom = {
        ...room,
        participants: [...room.participants, newParticipant]
    }

    activeRooms.push(updatedRoom)
    console.log(activeRooms)
}

const leaveActiveRoom = (roomId, participantSocketId) => {
    const activeRoom = activeRooms.find(r => r.roomId === roomId)
    if (activeRoom){
        const copyOfAR = {...activeRoom}
        copyOfAR.participants = copyOfAR.participants.filter(participant => participant.socketId !== participantSocketId)

        activeRooms = activeRooms.filter(room => room.roomId !== roomId)
        if (copyOfAR.participants.length > 0){
            activeRooms.push(copyOfAR)
        }else {
            if (deleteScheduledRoom(activeRoom.roomCode)) getSocketServerInstance().to(activeRoom.roomCreator.socketId).emit('scheduled-room-deletion', activeRoom.roomCreator.userId)
        }
    }
}

function notifyDeletedRoom (uid) {
    const socketID = getByValue(connectedUsers, uid)
    if (!socketID) return
    getSocketServerInstance().to(socketID).emit('scheduled-room-deletion', uid)
}


function getByValue(map, searchValue) {
  for (let [key, value] of map.entries()) {
    if (value.userId === searchValue)
      return key;
  }
}


module.exports = {
    addNewConnectedUser,
    removeConnectedUser,
    getSocketServerInstance,
    setSocketServerInstance,
    addNewActiveRoom,
    getActiveRooms,
    getActiveRoom,
    joinActiveRoom,
    leaveActiveRoom,
    updateSharedNotepad,
    updateChatMessages,
    deleteChatMessage,
    notifyDeletedRoom
}