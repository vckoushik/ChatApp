import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

function Message({message}) {
   
    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);

    const ref = useRef();
    

    return (
        <div className={`message ${message.senderId === currentUser.uid ? "sent-msg" : "received-msg"}`} ref={ref}>
            <p>{message.text}</p>
            <div>
            {message.img && <img src={message.img} alt="" /> }
            </div>
            <span  style={{fontSize:"10px",padding:"0px",color:"gray"}}>{message.date.toDate().toLocaleTimeString('en-US')}</span>
        </div>
    )
}

export default Message;