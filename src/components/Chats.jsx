import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from '../context/AuthContext'
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../FirebaseConfig';

function Chats() {
  const { currentUser }  = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [chats,setChats] = useState([]);
  useEffect(()=>{
   const getChats=()=>{
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  },[currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="user">
       
        <ul>
        {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
          <li className="padding" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                <img src={chat[1].userInfo.photoURL} alt="ProfileImg"/>
                <div className="column padding">

                    <div className="name"><span id="uname">{chat[1].userInfo.displayName}</span> <time>7:00 PM</time></div>
                    
                    <div className="msg"><span>✓  </span>{chat[1].lastMessage?.text}</div>
                </div>
           </li>
       
        ))}
         </ul>
    </div>
  )
}

export default Chats