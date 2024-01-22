import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../FirebaseConfig';
import Message from './Message';
import ChatInput from './ChatInput';
import DefaultChat from './DefaultChat';

function ChatWindow() {
    const [messages,setMessages] = useState([]);
    const [status,setStatus] = useState("");
    const {data} = useContext(ChatContext);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
          doc.exists() && setMessages(doc.data().messages);
        });
    
        return () => {
          unSub();
        };
      }, [data?.chatId]);

      useEffect(() => {
        const userStatus = async ()=>{
          const unSub = onSnapshot(doc(db, "users", data?.user?.uid), (doc) => {
            doc.exists() && setStatus(doc?.data()?.status);
          });
          return () => {
            unSub();
          };
        }
       if(data?.chatId !=="null"){
          userStatus();
       }

      }, [data?.user?.uid,data?.chatId]);

  const capital=(word)=>{
        const capitalized =
      word.charAt(0).toUpperCase()
      + word.slice(1)
      return capitalized;
  }

  let statusIcon = "bi bi-check-circle";
  let statusColor= "green";
  if(data.user?.displayName)
  {
    if(status === "offline"){
      statusIcon = "bi bi-x-circle-fill";
      statusColor= "red";
    }
    else{
      statusColor= "green";
      statusIcon = "bi bi-check-circle";
    }
  return (
    <section id="chat-container">
    <header className="padding">
        <img src={data.user.photoURL} alt="ProfileImg" />
        <div>
            <div className="name">{capital(data.user?.displayName)}</div>
           
            <div className="lastseen"><i style={{color: statusColor }} className={statusIcon}></i>{status}</div>
        </div>
        <div>
            
        </div>
    </header>
    <div className="chat-area">
        <div className="message-box">
        {messages.map((m) => (
        <Message message={m} key={m.id} />
        ))}
        </div>
    </div>
    
    <ChatInput/>

</section>

  )
}
else{
  return(
    <DefaultChat/>
  )
}
}


export default ChatWindow;