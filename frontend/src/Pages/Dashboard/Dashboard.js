import "./dashboard.scss";
import React,{useState, useEffect} from "react";
import MessageList from "../../Components/MessageList";
import ChatBox from "../../Components/ChatBox";
import { SocketProvider } from '../../Context/SocketProvider';

const Dashboard = () => {
  const [user,] = useState(JSON.parse(localStorage.getItem('User')));
  const [roomClicked, setRoomClicked] = useState({});
  useEffect(()=>{
    console.log(roomClicked);
  },[roomClicked])
  return (
    <SocketProvider id={user.id}>
      <div className="dashboard">
        <MessageList setRoomClicked={setRoomClicked}/>
        {roomClicked.roomId && <ChatBox user={user} roomClicked={roomClicked}/>}
      </div>
    </SocketProvider>
  );
};

export default Dashboard;
