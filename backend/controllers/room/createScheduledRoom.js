const ScheduledRoom = require('../../models/ScheduledRoomSchema')


const createScheduledRoom = async (req, res) => {
    if(!req.body) return res.status(400).send({error: 'No body'})
    let userScheduledRooms = await ScheduledRoom.find({creatorUID: req.body.creatorUID})

    const isNameTaken = userScheduledRooms.find(r=>r.roomName === req.body.roomName)
    if (isNameTaken) return res.status(409).send({error: 'Room with that name already exists.'})

    const scheduledRoom = await ScheduledRoom.create(req.body)
    setTimeout(async ()=>{
        const {notifyDeletedRoom} = require('../../socketStore')
        const r = await ScheduledRoom.findByIdAndDelete(scheduledRoom._id).catch(e=>console.log(e))
        if (r) notifyDeletedRoom(r.creatorUID)
    }, 72*60*60*1000)

    userScheduledRooms = [...userScheduledRooms, scheduledRoom]
    res.status(201).send(userScheduledRooms)
}
module.exports = createScheduledRoom