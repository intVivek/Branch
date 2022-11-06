import "./messageList.scss";
import React,{useEffect, useState} from "react";
import { useSocket } from '../../Context/SocketProvider';
import MessageCard from "../MessageCard";
import { toast } from 'react-toastify'


const MessageList = ({roomClicked, setRoomClicked}) => {
    const socket = useSocket();
    const [selected, setSelected] = useState(-1);
    const [list, setList] = useState([]);

    useEffect(()=>{
        socket&&socket.on('queries',(data)=>{
            console.log(data);
            setList([...data]);
        })
    },[socket])

    useEffect(()=>{
        socket && socket.on("agent",(agent)=>{
            console.log(agent);
            toast.success(`Handled by agent : ${agent.name}`);
        })
        return ()=>{
            socket && socket.emit("removeAgent",{room: roomClicked.roomId});
        }
    },[socket])

    return <div className="messageList">
        {list.map((user,i)=> {
            return <MessageCard 
                key={i}
                index={i}
                roomId={user._id}
                lastMessage={user.message}
                userId={user.user}
                roomClicked={roomClicked}
                setSelected={setSelected}   
                selected={selected}
                setRoomClicked={setRoomClicked}
            />
        })}
    </div>;
};

export default MessageList;