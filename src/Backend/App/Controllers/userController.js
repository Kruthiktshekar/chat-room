const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../Model/userModel')

const userController = {}

//controller to add user
userController.create = (req,res) => {
    const data = req.body
    console.log(data)
    const user = new User(data)
    bcrypt.genSalt()
    .then((salt)=>{
        bcrypt.hash(data.password,salt)
        .then((encrypted)=>{
            user.password = encrypted
            user.save()
            .then((data)=>{
                res.json(data)
                console.log(data)
            })
            .catch((err)=>{
                res.json(err)
            })
        })
        .catch((err)=>{
            res.json(err)
        })
    })
    .catch((err)=>{
        res.json(err)
    })
}


//controller for user login
userController.login=(req,res)=>{
    const data = req.body
    User.findOne({userName:data.userName})
    .then((user)=>{
        if(!user){
            console.log('incorrect userName or password')
        }
        bcrypt.compare(data.password,user.password)
        .then((verified)=>{
            console.log(verified,'verify')
            if(verified){
                const payload = {
                    id : user._id,
                    name : user.name,
                    createdAt : user.createdAt
                }
                const token = jwt.sign(payload,'user123',{expiresIn:'1d'})
                const result = {
                    token : `${token}`,
                    id : user._id,
                    name : user.name,
                    userName : user.userName
                }
                res.json(result)
            } else{
                res.json({message:'password is incorrect'})
            }
           
        })
        .catch((err)=>{
            res.json(err)
        })
    })
    .catch((err)=>{
        res.json(err)
    })
}

//constroller for show all the contacts except current user
userController.show = (req,res)=>{
    const token = req.header('Authorization')
    const result = jwt.verify(token,'user123')
    User.findById(result.id)
    .then((users)=>{
        res.json(users)
    })
    .catch((err)=>{
        res.json(err)
    })
}

userController.update = (req,res) => {
    const data = req.body
    console.log('FE',data)
    User.findById(data.id)
    .then((user)=>{
        console.log('user', user)
        bcrypt.compare(data.oldPass, user.password)
        .then((bol) =>{
            console.log('bol', bol)
            bcrypt.genSalt()
            .then((salt)=>{
                console.log('salt', salt)
                bcrypt.hash(data.newPass, salt)
                .then((enc)=>{
                    user.password = enc
                    user.name= data.name
                    console.log('enc', enc, user)
                    User.findByIdAndUpdate(user._id,user, { new: true})
                    .then((resData) =>{
                        console.log('resData', resData)
                        res.json(resData)
                    })
                    .catch((err) =>{
                        res.json(err)
                    })
                })
                .catch((err) =>{
                    res.json(err)
                })
            })
            .catch((err) =>{
                res.json(err)
            })
            
        })
        .catch((err) =>{
            res.json(err)
        })
           
        
       
    })
}

module.exports = userController