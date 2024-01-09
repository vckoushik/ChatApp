import React from 'react'
import { useState,useContext} from 'react';
import {db} from "../FirebaseConfig";
import { AuthContext } from '../context/AuthContext';
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

function SearchBar() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleSearch=async ()=>{
    const q = query(collection(db, "users"), where("displayName", "==", username));
    
    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setUser(doc.data());
      });
      console.log(user);
    }
    catch(err){
      setErr(true);
    }
  }

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  }

  const handleSelect= async ()=>{
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("");
    
  }

  return (
    
    <div className="search-container padding">
        <div className="input-container">
            <span>⌕</span>
            <input autoComplete="off" onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)} value={username} type="text" placeholder="Search or start a new chat" name="search" />
        </div>
        {err && <div>Not Found</div>}
        {user && <div className="user">
        <ul>
          <li className="padding" style={{cursor:'pointer'}} onClick={handleSelect}>
              <img src={user.photoURL} alt="ProfileImg"/>
              <div className="column padding">

                  <div className="name"><span id="uname">{user.displayName}</span> <time>7:00 PM</time></div>
                  
                  <div className="msg"><span>✓  </span>This is a message </div>
              </div>
          </li>       
        </ul>
        </div>  
        }
    </div>
    
  )
}

export default SearchBar