const ScheduledRoom = require('../../models/ScheduledRoomSchema')

const deleteScheduledRoom = async roomCode => {
    const r = await ScheduledRoom.findOneAndDelete({roomCode})
    return r ? true : false
}
module.exports = deleteScheduledRoom