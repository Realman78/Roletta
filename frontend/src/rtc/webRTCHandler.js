import store from '../store/store'
import { setChatMessages, setChosenStream, setLocalStream, setRemoteStreams, setRoomDetails, setSharedNotepadContent } from '../store/actions/roomActions'
import Peer from 'simple-peer'
import * as socketConnection from './socketConnection'

const onlyAudioConstraints = {
    audio: true,
    video: false
}
const defaultConstraints = {
    audio: true,
    video: true
}

const getConfiguration = () => {
    const turnIceServers = {
        iceServers: [
            {
                urls: [
                    process.env.REACT_APP_TURN_URL,
                ],
                username: process.env.REACT_APP_USERNAME,
                credential: process.env.REACT_APP_PASSWORD
            },
            {
                urls: process.env.REACT_APP_STUN_URL
            }
        ]
    }

    if (turnIceServers) {
        return turnIceServers
    } else {
        console.warn('Using only STUN server')
        return {
            iceServers: [
                {
                    urls: "stun:stun.l.google.com:19302",
                },
            ],
        }
    }
}

export const getLocalStreamPreview = (onlyAudio = false, callback) => {
    const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints

    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        store.dispatch(setLocalStream(stream))
        callback()
    }).catch(e => {
        alert('Access to camera/microphone has been blocked. Please enable access.')
        console.log('cannot get access to localstream' + e)
    })
}

let peers = {}

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
    const localStream = store.getState().room.localStream

    if (isInitiator) {
        console.log('initiator')
    } else {
        console.log('not init')
    }
    peers[connUserSocketId] = new Peer({
        initiator: isInitiator,
        config: getConfiguration(),
        stream: localStream
    })

    console.log(peers)

    peers[connUserSocketId].on('signal', data => {
        const signalData = {
            signal: data,
            connUserSocketId
        }

        socketConnection.signalPeerData(signalData)
    })

    peers[connUserSocketId].on('stream', remoteStream => {
        console.log('Remote stream came')
        remoteStream.connUserSocketId = connUserSocketId
        addNewRemoteStream(remoteStream)
        socketConnection.getRoomDetails(store.getState().room.roomDetails.roomId)
    })
}

export const handleSignalingData = data => {
    const { connUserSocketId, signal } = data
    if (peers[connUserSocketId]) {
        peers[connUserSocketId].signal(signal)
    }
}

export const addNewRemoteStream = remoteStream => {
    const remoteStreams = store.getState().room.remoteStreams
    const newRemoteStreams = [...remoteStreams, remoteStream]

    store.dispatch(setRemoteStreams(newRemoteStreams))
}

export const closeAllConnections = () => {
    Object.entries(peers).forEach(mappedObject => {
        const connUserSocketId = mappedObject[0]
        if (peers[connUserSocketId]) {
            peers[connUserSocketId].destroy()
            delete peers[connUserSocketId]
        }
    })
}

export const handleParticipantLeftRoom = data => {
    const { connUserSocketId } = data
    if (peers[connUserSocketId]) {
        peers[connUserSocketId].destroy()
        delete peers[connUserSocketId]
    }

    const remoteStreams = store.getState().room.remoteStreams
    const usersRemoteStreams = remoteStreams.filter(rs => rs.connUserSocketId === connUserSocketId)
    const newRemoteStreams = remoteStreams.filter(rs => rs.connUserSocketId !== connUserSocketId)
    store.dispatch(setRemoteStreams(newRemoteStreams))
    socketConnection.getRoomDetails(store.getState().room.roomDetails.roomId)

    const isChosenStreamFromUser = usersRemoteStreams.find(rs => rs === store.getState().room.chosenStream)
    if (isChosenStreamFromUser) store.dispatch(setChosenStream(null))
}

export const switchOutgoingTracks = (stream) => {
    for (let socket_id in peers) {
        for (let index in peers[socket_id].streams[0].getTracks()) {
            for (let index2 in stream.getTracks()) {
                if (
                    peers[socket_id].streams[0].getTracks()[index].kind ===
                    stream.getTracks()[index2].kind
                ) {
                    peers[socket_id].replaceTrack(
                        peers[socket_id].streams[0].getTracks()[index],
                        stream.getTracks()[index2],
                        peers[socket_id].streams[0]
                    );
                    break;
                }
            }
        }
    }
};

export const handleNotepadChange = (sharedNotepadContent) => {
    store.dispatch(setSharedNotepadContent(sharedNotepadContent))
}
export const handleSendMessage = (message) => {
    store.dispatch(setChatMessages(message))
}
export const handleRoomUpdate = (room) => {
    store.dispatch(setRoomDetails(room))
}
