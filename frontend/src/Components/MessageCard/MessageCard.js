import "./messageCard.scss";
import React from "react";
import {ListItem, ListItemAvatar, Avatar, ListItemText} from "@mui/material";

const MessageCard = (props) => {
  return (
    <ListItem onClick={()=>props.setRoomClicked(props.roomId)} button key={props.key + props.userId}>
    <ListItemAvatar>
      <Avatar alt="Profile Picture" src={`https://avatars.dicebear.com/api/avataaars/${props.userId}.svg`} />
    </ListItemAvatar>
    <ListItemText 
        primary={props.userId}
        secondary={
            props.lastMessage.length>100?props.lastMessage.substring(0,100)+"..."
            :props.lastMessage} />
  </ListItem>
  )
};

export default MessageCard;
