import "./dashboard.scss";
import React,{useState} from "react";
import MessageList from "../../Components/MessageList";
import ChatBox from "../../Components/ChatBox";
import { SocketProvider } from '../../Context/SocketProvider';

const Dashboard = () => {
  const [user, setUser] = useState(localStorage.getItem('User'));
  return (
    <SocketProvider id={user.id}>
      <div className="dashboard">
        <MessageList/>
        <ChatBox/>
      </div>
    </SocketProvider>
  );
};

export default Dashboard;
