const Chat = require('../Model/chatModel')

const chatController = {}

chatController.create = (req,res) => {
    const data = req.body
    const newChat = new Chat(data)
    newChat.save()
    .then((d)=>{
        res.json(d)
    })
    .catch((err)=>{
        res.json(err)
    })
}

chatController.show = (req,res) => {
    const id = req.query.id
    console.log('ids', id)
    Chat.find({
        roomId : id
    })
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    })
}
module.exports = chatController