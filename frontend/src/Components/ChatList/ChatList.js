import "./ChatList.scss";
import React,{useState} from "react";

const ChatList =({messages})=>{
    const [user,] = useState(localStorage.getItem('User')?JSON.parse(localStorage.getItem('User')):{});
    console.log(user);
    return(
        <div className="chatList">
            {messages&&messages.map((message,i)=>{
                console.log(message.userId,user.id)
                return <div className="chat" style={
                    {
                        alignSelf: message.userId===user.id?"flex-end":"flex-start",
                        backgroundColor: message.userId===user.id?"#1a8dffb5":"#fff",
                    }
                } key={i}>
                    {message.message}
                </div>
            })}
        </div>
    );
}

export default ChatList;