const express = require('express');
const app = express();
require("dotenv").config();
const server = require('http').createServer(app);
const {login, register} = require('./Routers');
const mongoose = require("mongoose");
const User = require("./Model/User");
const Message = require("./Model/Message");

const io = require('socket.io')(server,{
  cors:
  {
    origin: process.env.CLIENT_URL,
    allowedHeaders: ["*"],
  }
});

app.use(express.urlencoded({ extended : false }));
app.use(express.json());
app.set("trust proxy", 1);
mongoose.connect(process.env.MONGODB_URI,  
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  .then( async () => {
    console.log('DATABASE CONNECTED');
  })
  .catch(err => console.error("Error connecting to mongo", err));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
	res.setHeader('Access-Control-Allow-Headers', 'content-type,Authorization');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

let roomMap = {};
io.on('connection', async socket => {
  
  const id = socket.handshake.query.id
  socket.join(id)

  socket.on("join",async (user) => {
      socket.join(user.room);
      console.log("u",user);
      if(roomMap[user.room] && roomMap[user.room].agent){
        const agent = await User.find({id: roomMap[user.room].agent});
        socket.emit("agent", agent[0]);
      }
      else{
        if(!roomMap[user.room]){
          roomMap[user.room] = {client: user.user, agent: user.agent};
        }
        if(!roomMap[user.room].agent){
          roomMap[user.room].agent = user.agent;
        }
        const msg = await Message.find({room: user.room}).populate('user').sort({createdAt: 1});
        socket.emit("getallmessages",msg);
      }
    }
  )
  socket.on("sendMessage", async ({message,room,user})=>{
    if(message){
      const msg = await Message.create({message,room,user});
      socket.emit("reciveMessage",msg);
    }
  })

  socket.on("removeAgent", ({room}) => {
    console.log(room, roomMap, roomMap[room.roomId]);
    delete roomMap[room.roomId];
  })

  socket.emit("queries", await Message.aggregate(
    [
        { "$match": {} },
        { "$group": {
          "_id":"$room",
          "message": { "$first": "$message" },
          "user": {"$first": "$user"}
        }}
    ], ))

})

app.use(login);
app.use(register);

server.listen(process.env.PORT || 5000,()=>{
    console.log(`Server Started at port ${process.env.PORT}`);
});