const express = require('express')
const roomController = require('../App/Controllers/roomController')
const route = express.Router()

const userController = require('../App/Controllers/userController')
const chatController = require('../App/Controllers/chatController')

route.post('/api/register',userController.create)
route.post('/api/login',userController.login)
route.post('/api/createRoom',roomController.create)
route.get('/api/getroom',roomController.show)

route.post('/api/createChat',chatController.create)
route.get('/api/getMessage',chatController.show)

route.get('/api/user', userController.show)
route.put('/api/updateUser', userController.update)

module.exports = route