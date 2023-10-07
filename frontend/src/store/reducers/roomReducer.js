import { roomActions } from "../actions/roomActions";

const initState = {
    isUserInRoom: false,
    isUserRoomCreator: false,
    roomDetails: null,
    activeRooms: [],
    scheduledRooms: [],
    localStream: null,
    remoteStreams: [],
    chosenStream: null,
    audioOnly: false,
    screenSharingStream: null,
    isScreenSharingActive: false,
    isUserJoinedWithOnlyAudio: false,
    isChatHidden: false,
    isUnread: false,
    waitingInfo: null
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case roomActions.OPEN_ROOM:
            return {
                ...state,
                isUserInRoom: action.isUserInRoom,
                isUserRoomCreator: action.isUserRoomCreator
            }
        case roomActions.SET_ROOM_DETAILS:
            return {
                ...state,
                roomDetails: action.roomDetails
            }
        case roomActions.SET_ACTIVE_ROOMS:
            return {
                ...state,
                activeRooms: action.activeRooms
            }
        case roomActions.SET_LOCAL_STREAM:
            return {
                ...state,
                localStream: action.localStream
            }
        case roomActions.SET_AUDIO_ONLY:
            return {
                ...state,
                audioOnly: action.audioOnly
            }
        case roomActions.SET_REMOTE_STREAMS:
            return {
                ...state,
                remoteStreams: action.remoteStreams
            }
        case roomActions.SET_SCREEN_SHARE_STREAM:
            return {
                ...state,
                screenSharingStream: action.screenSharingStream,
                isScreenSharingActive: action.isScreenSharingActive
            }
        case roomActions.SET_IS_USER_JOINED_WITH_ONLY_AUDIO:
            return {
                ...state,
                isUserJoinedWithOnlyAudio: action.isUserJoinedWithOnlyAudio
            }
        case roomActions.SET_IS_CHAT_HIDDEN:
            return {
                ...state,
                isChatHidden: action.isChatHidden
            }
        case roomActions.SET_CHOSEN_STREAM:
            return {
                ...state,
                chosenStream: action.chosenStream
            }
        case roomActions.SET_SHARED_NOTEPAD_CONTENT:
            return {
                ...state,
                roomDetails: {
                    ...state.roomDetails,
                    sharedNotepadContent: action.sharedNotepadContent
                }
            }
        case roomActions.SET_CHAT_MESSAGES:
            return {
                ...state,
                roomDetails: {
                    ...state.roomDetails,
                    chatMessages: action.chatMessages
                }
            }
        case roomActions.SET_UNREAD_MESSAGE:
            return {
                ...state,
                isUnread: action.isUnread
            }
        case roomActions.SET_SCHEDULED_ROOMS:
            return {
                ...state,
                scheduledRooms: action.scheduledRooms
            }
        case roomActions.SET_WAITING_INFO:
            return {
                ...state,
                waitingInfo: action.waitingInfo
            }
        default:
            return state
    }
}

export default reducer