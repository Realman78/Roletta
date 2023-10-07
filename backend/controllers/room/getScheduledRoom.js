const ScheduledRoom = require('../../models/ScheduledRoomSchema')

const getScheduledRooms = async (req, res) => {
    if(!req.params.roomCode) return res.status(400).send({error: 'No room code provided'})
    const room = await ScheduledRoom.findOne({roomCode: req.params.roomCode})
    res.status(200).send(room)
}
module.exports = getScheduledRooms