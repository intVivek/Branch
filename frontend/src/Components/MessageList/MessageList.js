import "./messageList.scss";
import React,{useEffect, useState} from "react";
import { useSocket } from '../../Context/SocketProvider';
import MessageCard from "../MessageCard";

const MessageList = () => {
    const socket = useSocket();
    const [list, setList] = useState([]);

    useEffect(()=>{
        socket&&socket.on('queries',(data)=>{
            console.log(data);
            setList([...data]);
        })
    },[socket])

    return <div className="messageList">
        {list.map((user,i)=> {
            return <MessageCard key={i} roomId={user._id} lastMessage={user.message} userId={user.userId}/>
        })}
    </div>;
};

export default MessageList;