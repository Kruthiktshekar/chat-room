import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import "./room.css"

function Room() {
    const history = useNavigate()
    const [user, setUser ] = useState({})
    useEffect(()=>{
      axios.get('http://localhost:3500/api/user', {
        headers:{
          Authorization: JSON.parse(localStorage.getItem('chat-user')).token
        }
      })
      .then((user) =>{
        console.log(user, 'user')
        setUser(user.data)
        localStorage.setItem('userData', JSON.stringify(user.data))
      })
      .catch((err) =>{
        console.log('err',err)
      })
    },[])

    const logOutHandler = () =>{
      localStorage.clear()
      history('/')
    }
  
  
  return (
    <div className='room'>
      <button onClick={() => history('/createroom')}>create Room</button>
      <button onClick={() => history('/joinroom')}>Join Room</button>
      {
        user.name !== undefined && <button onClick={() =>history('/user')}>Profile</button>
      }
      <button onClick={logOutHandler}>Log out</button>
    </div>
  )
}

export default Room