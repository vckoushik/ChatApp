import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import Attach from '../images/attach.png';
import Img from '../images/img.png';

import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from '../FirebaseConfig';


function ChatInput() {
  const [text,setText] = useState("");
  const [img,setImg] = useState("");
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const handleSend = async () => {
    //If input is Image then we store it in storage and put an entry into chat
    //we put downloadable url
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    const currentTime = Timestamp.now();
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".lastMessageTime"]: {
        currentTime,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".lastMessageTime"]: {
        currentTime,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  const handleKeyDown = (event) => {
    if(event.key === 'Enter'){
      handleSend();
    }
  }
  return (
    <div className="msg-box">
        <input type="text" onKeyDown={handleKeyDown} value={text} onChange={e=>setText(e.target.value)} placeholder="Type a message" name="message" />
        <div>
            <img src={Attach} alt="" />
            <input className="attach"
              type="file"
              style={{ display: "none" }}
              id="file"
              onChange={(e) => setImg(e.target.files[0])}
            />
            <label htmlFor="file">
              <img src={Img} alt="" />
            </label>
           
        </div>
        <button className="send" onClick={handleSend}><i className="fa-solid fa-paper-plane"></i></button>
       
    </div>

  )
}

export default ChatInput