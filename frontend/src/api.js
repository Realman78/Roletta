import axios from 'axios'

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_DOMAIN,
    timeout: 1000
})

export const testConnection = async () => {
    try {
        return await apiClient.get('/api/connection')
    } catch (exception) {
        return {
            error: true,
            exception
        }
    }
}

export const getScheduledRooms = async (id) => {
    try {
        return await apiClient.get('/api/room/schedule/get/' + id)
    } catch (exception) {
        return {
            error: true,
            exception
        }
    }
}
export const getScheduledRoom = async (roomCode) => {
    try {
        return await apiClient.get('/api/room/schedule/getsingle/' + roomCode)
    } catch (exception) {
        return {
            error: true,
            exception
        }
    }
}
export const addScheduledRoom = async (body) => {
    try {
        return await apiClient.post('/api/room/schedule/create', body)
    } catch (exception) {
        return {
            error: true,
            exception
        }
    }
}

export const executeCode = async (body) => {
    try {
        return await apiClient.post('/api/execution', body, {timeout: 30_000})
    } catch (exception) {
        return {
            error: true,
            exception
        }
    }
}