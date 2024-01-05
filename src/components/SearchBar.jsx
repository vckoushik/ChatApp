import React from 'react'
import { useState,useContext} from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from "../FirebaseConfig";
import { AuthContext } from '../context/AuthContext';

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

  return (
    
    <div className="search-container padding">
        <div className="input-container">
            <span>⌕</span>
            <input autoComplete="off" onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)} value={username} type="text" placeholder="Search or start a new chat" name="search" />
        </div>
        {err && <div>Not Found</div>}
        {user && <div className="user">
        <ul>
          <li className="padding">
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