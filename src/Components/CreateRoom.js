import React, { useState } from 'react'
import  {useNavigate} from 'react-router-dom'
import axios from 'axios'
import "./createRoom.css"

const CreateRoom = () =>{

    const navigate = useNavigate()

    const [room,setRoom] = useState('')
    const [ roomId, setRoomId ] = useState('')

    const changeHandler = (e) => {
        setRoom(e.target.value)
    }

    const submit = async (e) => {
     
      try{ 
        const user = JSON.parse(localStorage.getItem('userData'))
        e.preventDefault()
        const resultData = {
          roomName: room,
          userId: user._id
        }
        const res = await axios.post('http://localhost:3500/api/createRoom',resultData)
        console.log(res, res.data)
        setRoomId(res.data._id)
        localStorage.setItem('roomId', JSON.stringify(res.data))
       
      }
      catch{
        console.log('error')
      }
    }
    const logOutHandler = () =>{
      localStorage.clear()
      navigate('/')
    }
  


    return(
        <div className='create-room'>
          <div className='create'>
            <h1>Room Name</h1>
            <input onChange={changeHandler} placeholder='Enter chat room name'/>
            <button onClick={submit}>create</button>
            {
              roomId && (<><p>You can use room id to join the chat room and also share to others, the ID is <b>{roomId}</b></p>
              <button onClick={() =>  navigate('/chatroom')}>Join Room</button></>)
            }
          </div>
          <div className='logout'>
            <button onClick={logOutHandler}>Log out</button>
          </div>
        </div>

    )
}

export default CreateRoom