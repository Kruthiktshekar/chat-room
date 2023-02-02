const express = require('express')
const cors = require('cors')
const configueDb = require('./ConfigueDb/db')
const route = require('./ConfigueDb/routes')
const app = express()
const socket = require('socket.io')

app.use(express.json())
app.use(cors())
app.use(route)

configueDb()

app.listen(3500,()=>{
    console.log("server started at 3500")
})

