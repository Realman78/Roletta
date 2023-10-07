import * as api from '../../api'

export const roomActions = {
    OPEN_ROOM: 'ROOM.OPEN_ROOM',
    SET_ROOM_DETAILS: 'ROOM.SET_ROOM_DETAILS',
    SET_ACTIVE_ROOMS: 'ROOM.SET_ACTIVE_ROOMS',
    SET_LOCAL_STREAM: 'ROOM.SET_LOCAL_STREAM',
    SET_REMOTE_STREAMS: 'ROOM.SET_REMOTE_STREAMS',
    SET_AUDIO_ONLY: 'ROOM.SET_AUDIO_ONLY',
    SET_SCREEN_SHARE_STREAM: 'ROOM.SET_SCREEN_SHARE_STREAM',
    SET_IS_USER_JOINED_WITH_ONLY_AUDIO: 'ROOM.SET_IS_USER_JOINED_WITH_ONLY_AUDIO',
    SET_IS_CHAT_HIDDEN: 'ROOM.SET_IS_CHAT_HIDDEN',
    SET_CHOSEN_STREAM: 'ROOM.SET_CHOSEN_STREAM',
    SET_SHARED_NOTEPAD_CONTENT: 'ROOM.SET_SHARED_NOTEPAD_CONTENT',
    SET_CHAT_MESSAGES: 'ROOM.SET_CHAT_MESSAGES',
    SET_UNREAD_MESSAGE: 'ROOM.SET_UNREAD_MESSAGE',
    SET_SCHEDULED_ROOMS: 'ROOM.SET_SCHEDULED_ROOMS',
    SET_WAITING_INFO: 'ROOM.SET_WAITING_INFO'
}

export const getActions = dispatch => {
    return {
        setAudioOnly: audioOnly => dispatch(setAudioOnly(audioOnly)),
        setScreenSharingStream: stream => dispatch(setScreenSharingStream(stream)),
        setIsChatHidden: isChatHidden => dispatch(setIsChatHidden(isChatHidden)),
        setChosenStream: chosenStream => dispatch(setChosenStream(chosenStream)),
        setSharedNotepadContent: content => dispatch(setSharedNotepadContent(content)),
        setUnreadMessage: isUnread => dispatch(setUnreadMessage(isUnread)),
        scheduleRoom: body => dispatch(scheduleRoom(body)),
        setScheduledRooms: body => dispatch(setScheduledRooms(body)),
        getScheduledRooms: id => dispatch(getScheduledRooms(id)),
        getScheduledRoom: roomCode => dispatch(getScheduledRoom(roomCode)),
        setWaitingInfo: waitingInfo => dispatch(setWaitingInfo(waitingInfo)),
    }
}

export const setOpenRoom = (isUserRoomCreator = false, isUserInRoom = false) => {
    return {
        type: roomActions.OPEN_ROOM,
        isUserRoomCreator,
        isUserInRoom
    }
}
export const setRoomDetails = (roomDetails) => {
    return {
        type: roomActions.SET_ROOM_DETAILS,
        roomDetails
    }
}
export const setActiveRooms = activeRooms => {
    return {
        type: roomActions.SET_ACTIVE_ROOMS,
        activeRooms
    }
}

export const setLocalStream = (localStream) => {
    return {
        type: roomActions.SET_LOCAL_STREAM,
        localStream
    }
}

export const setAudioOnly = (audioOnly) => {
    return {
        type: roomActions.SET_AUDIO_ONLY,
        audioOnly
    }
}

export const setRemoteStreams = remoteStreams => {
    return {
        type: roomActions.SET_REMOTE_STREAMS,
        remoteStreams
    }
}

export const setScreenSharingStream = stream => {
    return {
        type: roomActions.SET_SCREEN_SHARE_STREAM,
        isScreenSharingActive: stream ? true : false,
        screenSharingStream: stream || null
    }
}

export const setIsUserJoinedOnlyWithAudio = onlyWithAudio => {
    return {
        type: roomActions.SET_IS_USER_JOINED_WITH_ONLY_AUDIO,
        isUserJoinedWithOnlyAudio: onlyWithAudio
    }
}
export const setIsChatHidden = isChatHidden => {
    return {
        type: roomActions.SET_IS_CHAT_HIDDEN,
        isChatHidden
    }
}

export const setChosenStream = chosenStream => {
    return {
        type: roomActions.SET_CHOSEN_STREAM,
        chosenStream
    }
}

export const setSharedNotepadContent = sharedNotepadContent => {
    return {
        type: roomActions.SET_SHARED_NOTEPAD_CONTENT,
        sharedNotepadContent
    }
}

export const setChatMessages = chatMessages => {
    return {
        type: roomActions.SET_CHAT_MESSAGES,
        chatMessages
    }
}

export const setUnreadMessage = isUnread => {
    return {
        type: roomActions.SET_UNREAD_MESSAGE,
        isUnread
    }
}

export const setScheduledRooms = scheduledRooms => {
    return {
        type: roomActions.SET_SCHEDULED_ROOMS,
        scheduledRooms
    }
}

export const getScheduledRooms = id => {
    return async dispatch => {
        const response = await api.getScheduledRooms(id)
        if (response.error) {
            if (response.exception.response)
                return {error:response.exception.response.data}
            else return{error: 'Something went wrong. Try again later.'}
        } else {
            dispatch(setScheduledRooms(response.data))
            return {data: response.data}
        }
    }
}
export const getScheduledRoom = roomCode => {
    return async dispatch => {
        const response = await api.getScheduledRoom(roomCode)
        if (response.error) {
            if (response.exception.response)
                return {error:response.exception.response.data}
            else return{error: 'Something went wrong. Try again later.'}
        } else {
            return {data: response.data}
        }
    }
}

const scheduleRoom = body => {
    return async dispatch => {
        const response = await api.addScheduledRoom(body)
        if (response.error) {
            if (response.exception.response)
                return {error:response.exception.response.data}
            else return{error: 'Something went wrong. Try again later.'}
        } else {
            return {data: response.data}
        }
    }
}

export const setWaitingInfo = waitingInfo => {
    return {
        type: roomActions.SET_WAITING_INFO,
        waitingInfo
    }
}