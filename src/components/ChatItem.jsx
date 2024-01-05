import React from 'react'

function ChatItem() {
  return (
    <li className="padding">
            <img src="https://via.placeholder.com/65" alt="ProfileImg"/>
            <div className="column padding">

                <div className="name"><span id="uname">UserName1</span> <time>7:00 PM</time></div>
                
                <div className="msg"><span>✓  </span>This is a message </div>
            </div>
    </li>
  )
}

export default ChatItem