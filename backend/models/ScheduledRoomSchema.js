const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ScheduledRoomSchema = new Schema({
    roomName: {type:String, trim: true},
    roomCode: {type:String, trim: true},
    creatorName: {type:String, trim: true},
    creatorUID: {type:String, trim: true},
}, { timestamps: true })

const ScheduledRoom = mongoose.model('ScheduledRoom', ScheduledRoomSchema)
module.exports = ScheduledRoom