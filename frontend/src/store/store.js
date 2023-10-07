import {composeWithDevTools} from 'redux-devtools-extension'
import {combineReducers, createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import authReducer from './reducers/authReducer'
import roomReducer from './reducers/roomReducer'
import codeReducer from './reducers/codeReducer'

const rootReducer = combineReducers({
    room: roomReducer,
    auth: authReducer,
    code: codeReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store