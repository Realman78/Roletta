export const authActions = {
    SET_USER_ID: 'AUTH.SET_USER_ID',
    SET_USER_NAME: 'AUTH.SET_USER_NAME'
}

export const getActions = dispatch => {
    return {
        setUserId: userId => dispatch(setUserId(userId))
    }
}
export const setUserId = (userId) => {
    return {
        type: authActions.SET_USER_ID,
        userId
    }
}
export const setUsername = username => {
    return {
        type: authActions.SET_USER_NAME,
        username
    }
}