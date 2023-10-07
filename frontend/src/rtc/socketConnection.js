import io from 'socket.io-client'
import * as roomHandler from '../rtc/roomHandler'
import * as webRTCHandler from './webRTCHandler'
let socket = null

export const connectSocket = userId => {
    if (socket?.connected){
        return
    }
    socket = io(process.env.REACT_APP_DOMAIN, {
        auth: {
            uid: userId
        }
    })

    socket.on('connect', () => {
        console.log('Connected with socket server. ID: ' + socket.id)
    })

    socket.on('room-create', data => {
        roomHandler.newRoomCreated(data)
    })

    socket.on('active-rooms', data => {
        roomHandler.updateActiveRooms(data)
    })

    socket.on('conn-prepare', data => {
        const { connUserSocketId } = data
        webRTCHandler.prepareNewPeerConnection(connUserSocketId, false)
        socket.emit('conn-init', { connUserSocketId })
    })

    socket.on('conn-init', data => {
        const { connUserSocketId } = data
        webRTCHandler.prepareNewPeerConnection(connUserSocketId, true)
    })

    socket.on('room-participant-left', data => {
        console.log('user left room')
        webRTCHandler.handleParticipantLeftRoom(data)
    })
    
    socket.on('conn-signal', data => {
        webRTCHandler.handleSignalingData(data)
    })
    
    socket.on('notepad-content', data => {
        webRTCHandler.handleNotepadChange(data)
    })

    socket.on('send-message', data => {
        webRTCHandler.handleSendMessage(data)
    })

    socket.on('get-room-details', data => {
        webRTCHandler.handleRoomUpdate(data)
    })

    socket.on('scheduled-room-deletion', (uid) => {
        roomHandler.manageScheduledRooms(uid)
    })

    socket.on('wait-resolve', roomCode => {
        roomHandler.checkJoin(roomCode)
    })
}

export const createNewRoom = (name, roomName, roomCode) => {
    socket.emit('room-create', {name,roomName,roomCode})
}

export const joinRoom = data => {
    socket.emit('room-join', data)
}

export const leaveRoom = data => {
    socket.emit('room-leave', data)
}

export const signalPeerData = data => {
    socket.emit('conn-signal', data)
}

export const changeSharedNotepadcontent = data => {
    socket.emit('notepad-content', data)
}

export const sendMessage = data => {
    socket.emit('send-message', data)
}

export const deleteMessage = data => {
    socket.emit('delete-message', data)
}

export const getRoomDetails = data => {
    socket.emit('get-room-details', data)
}