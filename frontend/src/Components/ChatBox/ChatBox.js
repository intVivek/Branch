import "./chatBox.scss";
import React,{useEffect, useState} from "react";
import ChatList from "../ChatList";
import { useSocket } from '../../Context/SocketProvider';
import {Input, Button} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';


const ChatBox = (props) => {
    const socket = useSocket();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState();

    useEffect(()=>{
        console.log(props);
        socket.emit('join', {room: props.roomClicked.roomId, user: props.roomClicked.roomId, agent: props.user.id});
        socket.on('getallmessages',(data)=>{
            setMessages([...data]);
            console.log(data);
        })
        socket.on("reciveMessage",(msg)=>{
            setMessages((prev)=>{
                return [...prev,msg];
            })
        })
    },[props.roomClicked, socket])



    const handleSendMessage=()=>{
        const userId = JSON.parse(localStorage.getItem('User')).id;
        socket.emit('sendMessage', {message, room: props.roomClicked.roomId, user: userId});
        setMessage("");
    }

    return (
        <div className="chatBox">
            <ChatList messages={messages}/>
            <div className="sendMessage">
                <Input fullWidth placeholder="Placeholder" value={message} onChange={(e)=>setMessage(e.target.value)}/>
                <Button 
                    variant="contained" endIcon={<SendIcon />}
                    onClick={handleSendMessage}
                >
                    Send
                </Button>
            </div>
        </div>
    );
};

export default ChatBox;