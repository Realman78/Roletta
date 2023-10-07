const ScheduledRoom = require('../../models/ScheduledRoomSchema')

const getScheduledRooms = async (req, res) => {
    if(!req.params.id) return res.status(400).send({error: 'No ID provided'})
    let userScheduledRooms = await ScheduledRoom.find({creatorUID: req.params.id})

    res.status(200).send(userScheduledRooms)
}
module.exports = getScheduledRooms