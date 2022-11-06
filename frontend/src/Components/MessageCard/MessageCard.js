import "./messageCard.scss";
import React  from "react";
import { useSocket } from '../../Context/SocketProvider';
import {ListItem, ListItemAvatar, Avatar, ListItemText} from "@mui/material";

const MessageCard = (props) => {
  const socket = useSocket();

  const handleClick = async () => {
    props.setSelected(props.index);
    await socket && socket.emit("removeAgent", {room: props.roomClicked});
    props.setRoomClicked(()=>{
      return {roomId: props.roomId, userId: props.userId};
    })
  }
  
  return (
    <ListItem 
      selected={props.selected == props.index}
      onClick={handleClick}
      button key={props.key + props.userId}>
      <ListItemAvatar>
        <Avatar alt="Profile Picture" src={`https://avatars.dicebear.com/api/avataaars/${props.userId}.svg`} />
      </ListItemAvatar>
      <ListItemText 
          primary={props.userId}
          secondary={
              props.lastMessage.length>100?props.lastMessage.substring(0,100)+"..."
              :props.lastMessage}
      />
    </ListItem>
  )
};

export default MessageCard;
