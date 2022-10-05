const express = require('express');
const app = express();
require("dotenv").config();
const server = require('http').createServer(app);
const {login, register} = require('./Routers');
const mongoose = require("mongoose");
const Message = require("./Model/Message");
const User = require("./Model/User");
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

var room = {};
io.on('connection', async socket => {
  

  const id = socket.handshake.query.id
  socket.join(id)

  socket.on("join",async (user) => {
      console.log(user);
      socket.join(user.roomId);
      console.log(room);
      if(room[user.roomId] && room[user.roomId].agent){
        const agent = await User.find({id: room[user.roomId].agent});
        socket.emit("agent", agent[0]);
      }
      else{
        if(!room[user.roomId]){
          room[user.roomId] = {client: user.client, agent: user.agent};
        }
        if(!room[user.roomId].agent){
          room[user.roomId].agent = user.agent;
        }
        const msg = await Message.find({roomId: user.roomId});
        socket.emit("getallmessages",msg);
      }
    }
  )
  socket.on("sendMessage", async ({message,roomId,userId})=>{
    if(message){
      const msg = await Message.create({message,roomId,userId});
      socket.emit("reciveMessage",msg);
    }
  })

  socket.emit("queries", await Message.aggregate(
    [
        { "$match": {} },
        { "$group": {
          "_id":"$roomId",
          "message": { "$first": "$message" },
          "userId": {"$first": "$userId"}
        }}
    ],))

})

app.use(login);
app.use(register);

server.listen(process.env.PORT || 5000,()=>{
    console.log(`Server Started at port ${process.env.PORT}`);
});