
import SideBar from '../components/SideBar'
import ChatWindow from '../components/ChatWindow'
import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import DefaultChat from '../components/DefaultChat';

 const Home =(props) => {
  const {data} = useContext(ChatContext);

 
  return (
    <div className="container w-100">
    <main>
      <SideBar />
      
      {data == null || data.chatId === "null"? <DefaultChat />: <ChatWindow/>}
    
    </main>
    </div>
  )
}

export default Home