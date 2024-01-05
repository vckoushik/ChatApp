import React from 'react'

function ChatWindow() {
  return (
    <section id="chat-container">
    <header className="padding">
        <img src="https://via.placeholder.com/65" alt="ProfileImg" />
        <div>
            <div className="name">UserName</div>
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
                <div className="received-msg" >
                WhatsApp connects to your phone to sync messages.To reduce data usage,connect your phone to Wi-Fi
                </div>
                <div className="received-msg">
                    Hai
                </div>
                <div className="sent-msg">
                    Hello
                </div>
                <div className="sent-msg">
                    Hello
                </div>
                <div className="sent-msg">
                    Hello
                </div>
                <div className="sent-msg">
                    Hello
                </div>
                <div className="sent-msg">
                    Hello
                </div>
        </div>
    </div>
    <div className="msg-box">
        <input type="text"  placeholder="Type a message" name="message" />
        <button className="send"><i className="fa-solid fa-paper-plane"></i></button>
    </div>
    
</section>
  )
}

export default ChatWindow