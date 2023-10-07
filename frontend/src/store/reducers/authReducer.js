import { authActions } from "../actions/authActions";

const initState = {
    userId: null,
    username: ''
}

const reducer = (state=initState, action)=>{
    switch(action.type){
        case authActions.SET_USER_ID:
            return {
                ...state,
                userId: action.userId
            }
        case authActions.SET_USER_NAME:
            return {
                ...state,
                username: action.username
            }
        default:
            return state
    }
}

export default reducer