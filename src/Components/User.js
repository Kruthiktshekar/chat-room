import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "./user.css"

function User() {
    const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('userData'))
  const [ name, setName ] = useState(user.name)
  const [ oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const handleSubmit = () =>{
    const data = {
        name: name,
        id : user._id,
        oldPass,
        newPass
    }
    axios.put('http://localhost:3500/api/updateUser', data)
    .then((user) =>{
        console.log('data is updated', user)
    })
    .catch((err) =>{
        console.log('error')
    })
  }
  const logOutHandler = () =>{
    localStorage.clear()
    navigate('/')
  }
  return (
    <div className='user-form'>
        <div className = 'user'>
            <h1>User Form</h1>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)}/>
            <input type='password' placeholder='Enter Old Password' value={oldPass} onChange={(e) => setOldPass(e.target.value)} />
            <input type='password' placeholder='Enter new password' value={newPass} onChange={(e)=>setNewPass(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
        <div className='logout'>
            <button onClick={logOutHandler}>Log out</button>
        </div>
    </div>
  )
}

export default User