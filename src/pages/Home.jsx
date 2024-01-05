
import SideBar from '../components/SideBar'
import ChatWindow from '../components/ChatWindow'
import { useNavigate } from 'react-router-dom'

 const Home =(props) => {
  return (
    <div className="container w-100">
    <main>
      <SideBar />
      <ChatWindow />
    </main>
    </div>
  )
}

export default Home