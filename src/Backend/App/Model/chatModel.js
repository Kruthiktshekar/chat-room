const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = new Schema({
    roomId: {
        type: Schema.Types.ObjectId,
        ref: 'RoomModel'
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    userName : {
        type : String
    },
    message:{
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
    
})

const Chat = mongoose.model('Chat',chatSchema)

module.exports = Chat