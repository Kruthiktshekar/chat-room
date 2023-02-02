import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./joinRoom.css"

const JoinRoom = () =>{
    const [ id, setId] = useState('')
    const navigate = useNavigate()
    const handleJoin = (e) =>{
        e.preventDefault()
        axios.get('http://localhost:3500/api/getroom?id='+id)
        .then((res) =>{
            console.log('res', res)
            if(res.data){
                localStorage.setItem('roomId', JSON.stringify(res.data))
                setId('')
                navigate('/chatroom')
            }
        })
        .catch((err) =>{
            console.log('err',err)
        })
    }
    const logOutHandler = () =>{
        localStorage.clear()
        navigate('/')
      }
    return(
        <div className='join-room'>
            <div className='join'>
                <h1>Join Room</h1>
                <input type='text' placeholder='Enter Id for Joining Room' value={id} onChange = {(e) =>{setId(e.target.value)}}  />
                <button onClick={handleJoin}>Join</button>
            </div>
            <div className='logout'>
                <button onClick={logOutHandler}>Log out</button>
            </div>
            
        </div>
    )
}

export default JoinRoom