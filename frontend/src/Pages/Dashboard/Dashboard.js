import "./dashboard.scss";
import React,{useState} from "react";
import MessageList from "../../Components/MessageList";
import ChatBox from "../../Components/ChatBox";
import { SocketProvider } from '../../Context/SocketProvider';

const Dashboard = () => {
  const [user,] = useState(localStorage.getItem('User'));
  const [roomClicked, setRoomClicked] = useState("");
  return (
    <SocketProvider id={user.id}>
      <div className="dashboard">
        <MessageList setRoomClicked={setRoomClicked}/>
        {roomClicked && <ChatBox roomClicked={roomClicked}/>}
      </div>
    </SocketProvider>
  );
};

export default Dashboard;
