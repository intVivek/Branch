import "./ChatList.scss";
import React,{useState} from "react";

const ChatList =({messages})=>{
    const [user,] = useState(localStorage.getItem('User'));
    return(
        <div className="chatList">
            {messages&&messages.map((message,i)=>{
                return <div style={
                    {
                        width: "60%",
                        alignSelf: message.userId===user.userId?"flex-end":"flex-start",
                        textAlign: "left"
                    }
                } key={i}>
                    {message.message}
                </div>
            })}
        </div>
    );
}

export default ChatList;