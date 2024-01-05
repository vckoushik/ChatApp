import React from 'react'
import ChatItem from './ChatItem'
import SearchBar from './SearchBar'
import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../FirebaseConfig';

function SideBar() {
  const { currentUser } = useContext(AuthContext);
  
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
                    <li onClick={()=>signOut(auth)} style={{cursor:'pointer'}}>Logout</li>
                </ul>
                </div>
            </div>
        </menu>   
    </nav>
    <SearchBar/>

    <div className="user">
        <ul>
            <ChatItem/>  
            <ChatItem/>          
        </ul>
    </div>
</section>
  )
}

export default SideBar