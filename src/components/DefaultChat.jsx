import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';

function DefaultChat() {
  const { currentUser } = useContext(AuthContext);
  return (
    <section className="chat-box">
    <img src={currentUser.photoURL} alt="temp"/>
    <h2>Welcome to ChatApp</h2>
    <p>Chat with your loved ones.</p>   
    </section>
  )
}

export default DefaultChat;