import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import "./chatRoom.css"

function ChatRoom() {
  const [ msg, setMsg] = useState('')
  const [ allMsg, setAllMsg ] = useState([])
  const navigate = useNavigate()
  const room = JSON.parse(localStorage.getItem('roomId'))
  const userData = JSON.parse(localStorage.getItem('userData'))

  const handleSubmit = (e) =>{
    e.preventDefault()
    const data = {
      roomId: room._id,
      userId: userData._id,
      userName: userData.name,
      message: msg
    }
    axios.post('http://localhost:3500/api/createChat', data)
    .then((res) =>{
      setAllMsg((prev) => [...prev, res.data])
      setMsg('')
    })
    .catch((err) =>{
      console.log('err',err)
    })
  }
  useEffect(() =>{
    axios.get('http://localhost:3500/api/getMessage?id='+room._id)
    .then((resData) =>{
      console.log(resData)
      setAllMsg(resData.data)
    })
    .catch((err) =>{
      console.log('error',err)
    })
    // eslint-disable-next-line
  },[])

 
  const logOutHandler = () =>{
    localStorage.clear()
    navigate('/')
  }


  return (
    <div className='chat-room'>
      <div className='chat'>
      <h1>{room.roomName}(Chat Room)</h1>
      {
        allMsg.length !== 0 && allMsg.map((msg, idx) =>{
          return <div key={idx} className='chat-msg'>
            <p className={userData._id === msg.userId?'pTag right':'pTag left'}>{msg.userName[0]}</p>
            <p className={userData._id === msg.userId? 'pTag2 right':'pTag2 left'}>{msg.message}</p>
          </div>
        })
      }
      <div className='chat-input'>
        <input type='text' placeholder='type msg...' value = {msg} onChange = {(e) => setMsg(e.target.value)} />
        <button onClick={(e) =>{handleSubmit(e)}}>Send</button>
      </div>
   
      </div>
      <div className='logout'>
        <button onClick={logOutHandler}>Log out</button>
      </div>
    </div>
  )
}

export default ChatRoom