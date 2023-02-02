const RoomModel = require('../Model/roomModel')

const roomController = {}

roomController.create = (req,res) => {
    const data = req.body
    console.log('data',data)
    const room = new RoomModel(data)
    room.save()
    .then((r)=>{
        console.log('res',r)
        res.json(r)
    })
    .catch((err)=>{
        console.log(err,'error')
    })
}

roomController.show = (req,res) => {
    const id = req.query.id
    console.log('id', id)
    RoomModel.findById(id)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    })
}
module.exports = roomController