import React from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LogIn from "./Pages/login";
import Register from "./Pages/signIn";
import Room from "../src/Components/Room"
import CreateRoom from "./Components/CreateRoom";
import ChatRoom from "./Components/ChatRoom";
import JoinRoom from "./Components/JoinRoom";
import User from "./Components/User";

//declaring routes for login,registration and message pages

export default function App() {
    return(
    <BrowserRouter>
      <Routes>
         <Route path="/register" element={<Register/>}/>
         <Route path="/" element={<LogIn/>}/>
         <Route path="/room" element={<Room/>}/>
         <Route path="/createroom" element={<CreateRoom/>}/>
         <Route path="/chatroom" element={<ChatRoom/>}/>
         <Route path="/joinroom" element={<JoinRoom/>}/>
         <Route path="/user" element={<User/>}/>
      </Routes> 
    </BrowserRouter>

    )
}