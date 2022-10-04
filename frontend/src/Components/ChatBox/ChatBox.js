import "./chatBox.scss";
import React,{useEffect, useState} from "react";
import ChatList from "../ChatList";
import { useSocket } from '../../Context/SocketProvider';

const ChatBox = (props) => {
    const socket = useSocket();
    // console.log(localStorage.getItem('User'));
    // console.log(props.roomClicked);
    const [message, setMessage] = useState();
    useEffect(()=>{
        socket.emit('join', {roomId: props.roomClicked});
        socket.on('getallmessages',(data)=>{
            setMessage([...data]);
            console.log(data);
        })
        socket.on("reciveMessage",(msg)=>{
            setMessage((prev)=>{
                return [...prev,msg];
            })
        })
    },[props.roomClicked, socket])

    return (
        <div className="charBox">
            <ChatList messages={message}/>
        </div>
    );
};

export default ChatBox;