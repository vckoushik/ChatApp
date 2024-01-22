import React from 'react'
import SearchBar from './SearchBar'
import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { auth ,db } from '../FirebaseConfig';
import Chats from './Chats';
import { ChatContext } from '../context/ChatContext';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
function SideBar() {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const navigate = useNavigate();
  const handleSignOut= async()=>{

    const INITIAL_STATE = {
        chatId: "null",
        user: {},
      };
     dispatch({ type: "CHANGE_USER", payload: INITIAL_STATE});
     await updateDoc(doc(db, "users", currentUser.uid), {
      status: "offline"
    });
     signOut(auth);
     
     navigate("/login");
  }
  return (
    <section className="user-list">
    <nav className="padding">
        <img src={currentUser.photoURL} alt="Profile" />

        <span className="text-center text-capitalize font-weight-bold">{currentUser.displayName}</span>
        <menu>
            <button><i className="fa fa-phone" aria-hidden="true"></i></button>
            <button><i className="fa-solid fa-envelope"></i></button>
            <div className="dropdown">
            <button><i className="fa-solid fa-bars"></i></button>
            <div className="dropdown-content">
                <ul className="dropdown-list">
                    <li>Profile</li>
                    <li>Settings</li>
                    <li onClick={handleSignOut} style={{cursor:'pointer'}}>Logout</li>
                </ul>
                </div>
            </div>
        </menu>   
    </nav>
    <SearchBar/>
    
    <Chats/>
</section>
  )
}

export default SideBar