import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../FirebaseConfig';
import Message from './Message';
import ChatInput from './ChatInput';
import DefaultChat from './DefaultChat';

function ChatWindow() {
    const [messages,setMessages] = useState([]);
    const {data} = useContext(ChatContext);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
          doc.exists() && setMessages(doc.data().messages);
        });
    
        return () => {
          unSub();
        };
      }, [data.chatId]);

  const capital=(word)=>{
        const capitalized =
      word.charAt(0).toUpperCase()
      + word.slice(1)
      return capitalized;
  }

  if(data.user?.displayName)
  {
  return (
    <section id="chat-container">
    <header className="padding">
        <img src={data.user.photoURL} alt="ProfileImg" />
        <div>
            <div className="name">{capital(data.user?.displayName)}</div>
            <div className="lastseen">last seen today</div>
        </div>
        <div>
            <button>✆</button>
            <button>✉</button>
            <button>☰</button>
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


export default ChatWindow