const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomSchema = new Schema ({
    roomName : {
        type : String
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
})
const RoomModel = mongoose.model('RoomModel',roomSchema)

module.exports = RoomModel