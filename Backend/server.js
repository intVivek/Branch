const express = require('express');
const app = express();
require("dotenv").config();
const server = require('http').createServer(app);
const {login, register} = require('./Routers');
const mongoose = require("mongoose");

app.use(express.urlencoded({ extended : false }));
app.use(express.json());
app.set("trust proxy", 1);

mongoose.connect(process.env.MONGODB_URI,  
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  .then(() => console.log('DATABASE CONNECTED'))
  .catch(err => console.error("Error connecting to mongo", err));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
	res.setHeader('Access-Control-Allow-Headers', 'content-type,Authorization');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

app.use(login);
app.use(register);

server.listen(process.env.PORT || 5000,()=>{
    console.log(`Server Started at port ${process.env.PORT}`);
});